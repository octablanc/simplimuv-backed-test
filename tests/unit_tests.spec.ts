import request from "supertest";
import App from "../src/App";
import { Express } from "express";
import { v4 } from "uuid";
import LeadModel from "../src/models/Lead.model";
import ContactModel from "../src/models/Contact.model";

let app: Express;
let token: string;

beforeAll(async () => {
    app = await App();
    const { token: tokenRequested } = (await request(app).post("/generate-token").send({ access_user: "khMsNtJ2jHKqDnFqLMDudg" })).body;
    token = tokenRequested;
});

const expectedProductKeys = [
    "id",
    "name",
    "product_category",
    "product_type",
    "product_brand",
    "product_variants"
];

describe("GET /products/{category_name}", () => {
    test("Debería devolver los producto con las claves principales", async () => {
        const response = await request(app)
            .get("/products/motorcycles")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Object.keys(response.body[0])).toEqual(expect.arrayContaining(expectedProductKeys));
    });
});

describe("GET /products/{category_name}?uuid={id}", () => {
    test("Debería devolver un producto con las claves principales", async () => {
        const response = await request(app)
            .get("/products/motorcycles?uuid=0b4e65e9-4321-445e-8ada-ddf8cacb5108")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expectedProductKeys.forEach(key => {
            expect(response.body).toHaveProperty(key);
        });
    });
});

describe("POST /createlead", () => {
    test("Debería devolver una respuesta OK", async () => {
        const id = v4();
        const response = await request(app)
            .post("/createlead")
            .set("Authorization", `Bearer ${token}`)
            .send({
                "uuid": id,
                "accesories": ["alskjda92837942"],
                "contact": {
                    "firstname": "Test",
                    "lastname": "Test",
                    "email": "test@test.com",
                    "phone": "203984023",
                    "finace": true,
                    "trade": false
                }
            });

        expect(response.status).toBe(200);

        const leadTest = await LeadModel.findByPk(id, {
            include: [{ model: ContactModel }]
        });
        const contact = await ContactModel.findByPk(leadTest?.dataValues.contact.id);
        leadTest?.destroy();
        contact?.destroy();
    });
});

const expectedConfigKeys = [
    "id",
    "header",
    "footer",
    "generalColors",
    "social",
];

describe("GET /config", () => {
    test("Debería devolver loa configuracion con las claves principales", async () => {
        const response = await request(app)
            .get("/config")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Object.keys(response.body[0])).toEqual(expect.arrayContaining(expectedConfigKeys));
    });
});