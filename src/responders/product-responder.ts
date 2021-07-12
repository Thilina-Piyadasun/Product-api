import ProductSchema from "../common/model/product-schema";
import { Types } from "mongoose";
import { ProductResponse } from "../common/response/product-response";
import { RESPONSE_STATUS } from "../common/constants";

export namespace ProductResponder {
  /**
   *
   * This will save the received Todo_item to the mongoDB
   * req.body will contain the newly added todo_item
   * @param req
   * @param res
   */
  export async function save(req: any, res: any): Promise<any> {
    const response = new ProductResponse(RESPONSE_STATUS.FAILED, [], "");

    try {
      const { id, name, type, price, active } = req.body;

      const product_schema = new ProductSchema({
        _id: new Types.ObjectId(),
        id: id,
        name: name,
        type: type,
        price: price,
        active: active,
      });
      const result = await product_schema.save();
      response.status = RESPONSE_STATUS.SUCCESS;
      response.data = [result];
      response.message = "Successfully saved to DB";
    } catch (e) {
      console.error("[todo-responder save] Error while saving to DB", e);
      response.message = "Error while saving to DB";
      res.status(500).json(response);
    }
    return res.json(response);
  }

  /**
   * This method will fetch  all the stored todo's
   * @param req
   * @param res
   */
  export async function load(req: any, res: any): Promise<any> {
    const response = new ProductResponse(RESPONSE_STATUS.FAILED, [], "");
    try {
      const result = await ProductSchema.find();
      response.status = RESPONSE_STATUS.SUCCESS;
      response.data = [result];
      response.message = "Successfully load from DB";
    } catch (e) {
      console.error(
        `[todo-responder save] Error while loading data  from DB`,
        e
      );
      response.message = `Error while deleting loading data from DB`;
      res.status(500).json(response);
    }
    return res.json(response);
  }

  export async function deleteTodo(req: any, res: any): Promise<any> {
    const response = new ProductResponse(RESPONSE_STATUS.FAILED, [], "");
    const product_id = req.params["id"];
    try {
      const result = await ProductSchema.findOneAndRemove({ id: product_id });
      response.status = RESPONSE_STATUS.SUCCESS;
      response.data = [result];
      response.message = "Successfully deleted from DB";
    } catch (e) {
      console.error(
        `[todo-responder save] Error while deleting id ${product_id} from DB`,
        e
      );
      response.message = `Error while deleting record id ${product_id} from DB`;
      res.status(500).json(response);
    }
    return res.json(response);
  }

  export async function updateProduct(req: any, res: any) {
    const response = new ProductResponse(RESPONSE_STATUS.FAILED, [], "");
    try {
      console.log("[Body]",req.body );
      const { id, name, type, price, active } = req.body;
      console.log(id);
      const dbObject = await ProductSchema.findOne({ name: name });
      console.log(dbObject);
      if (dbObject) {
        dbObject.name = name;
        dbObject.type = type;
        dbObject.price = price;
        dbObject.active = active;
        const savedObject = await dbObject.save();
        response.status = RESPONSE_STATUS.SUCCESS;
        response.data = [savedObject];
        response.message = "Successfully deleted from DB";
        res.json(response);
      } else {
        res.status(404).send(response);
      }
    } catch (e) {
      console.error(
        `[todo-responder save] Error while updating DB`,
        e
      );
      response.message = `Error while updating record  DB`;
      res.status(500).json(response);
    }
  }
}
