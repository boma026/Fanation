const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const bucket = require('../firebase');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('imagem'), async (req, res) => {
  try {
    const file = req.file;
    const nomeArquivo = `${uuidv4()}-${file.originalname}`;

    const blob = bucket.file(`assets/${nomeArquivo}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).send({ error: 'Erro ao fazer upload da imagem' });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/assets/${nomeArquivo}`;
      res.status(200).send({ imageUrl: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

module.exports = router;