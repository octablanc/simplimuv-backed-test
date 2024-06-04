import express from "express";
import morgan from "morgan";
import DBcontext from "./context/DBConext";
import cors from "cors";
import router from "./router/Router";
import { authentication } from "./middleware/authentication";
import { generateToken } from "./controllers/GenerateToken.controller";
const { PORT } = process.env;
const app = express();

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(cors());
app.use(express.json());
app.post("/generate-token", generateToken);
app.use(authentication);
app.use("/", router);

export default async function App() {
    try {
        await DBcontext.sync({ force: false, alter: true });
    } catch (error) {
        if (error instanceof Error)
            console.log("Error while synchronizing the database: ", error.message);
    }

    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    });

    return app;
}

