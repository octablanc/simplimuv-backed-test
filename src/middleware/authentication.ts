import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
        return res.status(400).json({ mensaje: "Token not provided" });
    }

    if (!JWT_SECRET) {
        return res.status(500).json({ mensaje: "Internal server error: JWT_SECRET key undefined" });
    }

    const [, token] = authorizationHeader.split(" ");

    if (!token) {
        return res.status(400).json({ mensaje: "Invalid token format" });
    }

    jwt.verify(token, JWT_SECRET as Secret, (err) => {
        if (err) {
            return res.status(400).json({ mensaje: "Invalid token" });
        }
        next();
    });
};