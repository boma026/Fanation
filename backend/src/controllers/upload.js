const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../../config/cloudinary');

// Multer para armazenar arquivo na memória
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('imagem'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Arquivo não enviado' });

    const nomeArquivo = `assets/${uuidv4()}-${file.originalname}`;

    // Função para upload via stream com Promise
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

    return res.status(200).json({ imagemUrl: resultado.secure_url });
  } catch (err) {
    console.error('Erro geral no upload:', err);
    res.status(500).json({ error: 'Erro interno ao fazer upload' });
  }
});

module.exports = router;
