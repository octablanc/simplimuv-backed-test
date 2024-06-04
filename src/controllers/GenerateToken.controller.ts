import { Request, Response } from "express";

import jwt, { Secret } from "jsonwebtoken";

const { JWT_SECRET, ACCESS_USER } = process.env;

export const generateToken = (req: Request, res: Response) => {
    const { access_user } = req.body;

    if (!access_user)
        return res.status(400).json({ mensaje: "Missing access_user field" });

    if (!ACCESS_USER)
        return res.status(500).json({ mensaje: "Intersal server error: ACCSESS_USER undefined" });

    if (!JWT_SECRET)
        return res.status(500).json({ mensaje: "Intersal server error: JWT_SECRET undefined" });

    if (access_user !== ACCESS_USER)
        return res.status(400).json({ mensaje: "Invalid access_user" });

    const token = jwt.sign({ ACCESS_USER }, JWT_SECRET as Secret, { expiresIn: "1h" });
    res.json({ token });
};