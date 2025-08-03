import express from "express";
import { loginController } from "../controllers/loginController";
import { editRecortesController, getRecorteController, getRecortesController, postRecortesController } from "../controllers/recortesController";
import { upload } from "../config/multer";
import { uploadImagemController } from "../controllers/uploadController";

export const router = express.Router();

router.post("/login", loginController);

router.get("/recortes", getRecortesController);

router.get("/recortes/:id", getRecorteController);

router.put("/recortes", editRecortesController);

router.post("/upload", upload.single('imagem'), uploadImagemController);

router.post("/recortes", postRecortesController);