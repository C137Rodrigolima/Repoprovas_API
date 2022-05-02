import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import router from "./routes/index.js";
import { errorHandleMiddleware } from "./middlewares/errorHandleMiddleware.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(json())
app.use(router);
app.use(errorHandleMiddleware);

export default app;