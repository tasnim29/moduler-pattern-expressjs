import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = Router();

// routes--->controller--->service
// so here we handle the route part only
router.post("/", userControllers.createUser);

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
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

export const userRoutes = router;
