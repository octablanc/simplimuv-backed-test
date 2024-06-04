import express, { Request, Response } from "express";
import LeadModel from "../models/Lead.model";
import ContactModel from "../models/Contact.model";
import Joi from "joi";

const leadRouter = express.Router();

const schemaCreateLead = Joi.object({
    uuid: Joi.string().required(),
    accesories: Joi.array().items(Joi.string()).required(),
    contact: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        finace: Joi.boolean().required(),
        trade: Joi.boolean().required()
    }).required()
});

async function getLeads(req: Request, res: Response) {
    try {
        const result = await LeadModel.findAll({
            include: [
                {
                    model: ContactModel
                }
            ],
            attributes: {exclude: [ "contactId" ]}
        });

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

async function createLead(req: Request, res: Response) {
    const data = req.body;
    const { error } = schemaCreateLead.validate(data);

    if (error)
        throw new Error("Validation error (missing fields): " + error.details.map(detail => detail.message).join("; "));

    console.log(error);

    try {
        const contact = await (await ContactModel.create({
            firstname: data.contact.firstname,
            lastname: data.contact.lastname,
            email: data.contact.email,
            phone: data.contact.phone,
            finace: data.contact.finace,
            trade: data.contact.trade
        })).save();

        await (await LeadModel.create({
            id: data.uuid,
            contactId: contact.dataValues.id
        })).save();

        return res.send({response: "OK", msg: "Lead Created", code: 200});
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).send({ message: error.message });
        else
            return res.status(400).send({ error });
    }
}

leadRouter.get("/getleads", getLeads);
leadRouter.post("/createlead", createLead);

export default leadRouter;