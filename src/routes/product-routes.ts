import express from "express";
import { ProductResponder } from "../responders/product-responder";

/**
 * Routers
 *
 */
const router = express.Router();

router.get("/", ProductResponder.load);
router.post("/", ProductResponder.save);
router.delete("/:id", ProductResponder.deleteTodo);
router.put("/", ProductResponder.updateProduct);

export default router;
