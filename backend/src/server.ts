import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { router } from "./router/routes";

dotenv.config();
const server = express();
server.use(helmet());
server.use(express.json())
server.use(cors({origin: "http://localhost:3000"}));

server.use("/", router);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));