import express, {  Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRouter } from "./modules/todos/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();


// parser
app.use(express.json());

// initialize DB
initDB();

// users crud
app.use("/users", userRoutes);
// todos crud
app.use("/todos", todoRouter);
// auth crud
app.use("/auth",authRoutes)

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World next level developers");
});

app.use((req, res) => {
  res.status(400).json({
    success: false,
    message: "No route found",
  });
});

export default app