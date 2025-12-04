import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
  
  try {
    const result = await todoServices.createTodo(req.body);
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
};
const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodo();
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
};
const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getSingleTodo(req.params.id!);
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
};
const updateTodo = async (req: Request, res: Response) => {
  
  try {
    const result = await todoServices.updateTodo( req.body,req.params.id!);
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
};
const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await todoServices.deleteTodo(id!);
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
};

export const todoControllers = {
  createTodo,
  getTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
