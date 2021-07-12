import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ProdutRouter from "./routes/product-routes";
import { AppConfig } from "./config/app-config";

/**
 * Mongoose connection url
 */
mongoose.connect(
  "mongodb+srv://Admin:" +
  AppConfig.MONGO_PASSWORD +
  "@tododb.mqwaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const app = express().use(express.json());
app.use(cors());

/**
 * Log all incoming requests to server
 */
app.all("/todo/api/*", (req: any, res: any, next: any) => {
  console.log(`Received request:  ${req.method}  =>  ${req.url}`);
  next();
});

/**
 * Registering the routers
 */
app.use("/todo/api", ProdutRouter);

if (AppConfig.LISTEN_PORT !== undefined) {
  app.listen(AppConfig.LISTEN_PORT, function () {
    console.log(" Startup complete.", AppConfig.LISTEN_PORT);
    console.log("==========================================");
  });
} else {
  console.error(" LISTEN_PORT is undefined; exiting... ");
  process.exit();
}
