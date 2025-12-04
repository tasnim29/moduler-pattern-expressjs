import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload }  from "jsonwebtoken";
import config from "../config";

const auth=(...roles:string[])=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        try{
            const token = req.headers.authorization;
        console.log(token)
        if(!token){
            return res.status(500).json({
                success:false,
                message:"No token found"
            })
        }
        const decoded = jwt.verify(token,config.jwt_secret as string) as JwtPayload
        req.user = decoded 
        console.log({decoded})

        if(roles.length && !roles.includes(decoded.role as string)){
            return res.status(401).json({
                success:false,
                error:"Unauthorized",
                message:"you are not allowed..Get out"
            })
        }

        next()
        }catch(error:any){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}
export default auth;