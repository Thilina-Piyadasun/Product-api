import { model, Schema } from "mongoose";

/**
 * This is the model saved in MongoDB
 */
const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    name: String,
    type: String,
    price: Number,
    active: Boolean,
});

export default model("ProductSchema", productSchema);
