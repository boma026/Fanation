import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../config/cloudinary";

export const uploadImagemController:RequestHandler = async (req,res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Arquivo não enviado' });

    const nomeArquivo = `assets/${uuidv4()}-${file.originalname}`;

    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'fanation',
            public_id: nomeArquivo,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
    };

    const resultado = await uploadStream();
    res.status(200).json({ message: 'Upload feito com sucesso', resultado });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
  }
}