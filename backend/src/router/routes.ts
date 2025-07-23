import express from "express";
import { loginController } from "../controllers/loginController";
import { editRecortesController, getRecorteController, getRecortesController } from "../controllers/recortesController";

export const router = express.Router();

router.post("/login", loginController);

router.get("/recortes", getRecortesController);

router.get("/recortes/:id", getRecorteController);

router.put("/recortes/", editRecortesController)