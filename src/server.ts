import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.port;

// parser
app.use(express.json());

// initialize DB
initDB();

// users crud
app.use("/users", userRoutes);

// put single user
app.put("/users/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(400).json({
        success: true,
        Message: "no data found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "updated data",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// delete single users
app.delete("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    if (result.rowCount === 0) {
      res.status(400).json({
        success: false,
        message: "delete failed",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "successfully deleted",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// post todos
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,
      [user_id, title]
    );
    res.status(200).json({
      success: true,
      message: "Inserted Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// get all todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(201).json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// get single todo
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: "No data found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "success",
        data: result.rows[0],
      });
    }
    // console.log(result.rows);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// update single todo
app.put("/todos/:id", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `UPDATE todos SET user_id=$1,title=$2 WHERE id=$3 RETURNING *`,
      [user_id, title, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(400).json({
        success: false,
        message: "no data found",
      });
    } else {
      res.status(201).json({
        success: true,
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// delete single todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
    if (result.rowCount === 0) {
      res.status(400).json({
        success: false,
        message: "delete failed",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "successfully deleted",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World next level developers");
});

app.use((req, res) => {
  res.status(400).json({
    success: false,
    message: "No route found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
