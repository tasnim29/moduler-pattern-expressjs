import { NextFunction, Request, Response } from "express"

const logger =(req:Request,res:Response,next:NextFunction)=>{
  console.log(`The date is ${new Date().toISOString()},the method ${req.method} and the path ${req.path} `)
  // const fs = 
  next()
}

export default logger