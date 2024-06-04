import express, { Request, Response } from "express";
import AppConfigModel from "../models/AppConfig.model";

const appConfigRouter = express.Router();

async function getAppConfig(req: Request, res: Response) {
    try {
        const result = await AppConfigModel.findAll();

        if (!result)
            throw Error("Not found.");

        return res.send(result);
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).send({ message: error.message });
        else
            return res.status(400).send({ error });
    }
}

appConfigRouter.get("/config", getAppConfig);

export default appConfigRouter;