import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

// routes--->controller--->service
// so here we handle the controller part only means get req and send res
const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await userServices.createUser(name, email);

    res.status(201).json({
      success: true,
      message: "data inserted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  console.log(req.body);
};
export const userControllers = {
  createUser,
};
