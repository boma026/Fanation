import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";
dotenv.config();

export const autenticarToken:RequestHandler = (req, res, next) => {

  if(req.headers.authorization) {
    const [authType, token] = req.headers.authorization.split(" ");

    if(authType === "Bearer") {

      try{
        jwt.verify(token, process.env.JWT_SECRET as string)
        next();
      }
      
      catch(e) {
        return res.status(403).json({error: "Não autorizado"})
      }

    };
  }
}