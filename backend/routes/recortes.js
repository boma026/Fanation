const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /recortes - listar todos
router.get('/', async (req, res) => {
  const recortes = await prisma.recorte.findMany();
  res.json(recortes);
});

// POST /recortes - criar novo recorte
router.post('/', async (req, res) => {
  try {
    const {
      nomeModelo,
      ordemExibicao,
      sku,
      tipoRecorte,
      posicao,
      tipoProduto,
      material,
      cor,
      imagemUrl,
    } = req.body;

    const novoRecorte = await prisma.recorte.create({
      data: {
        nomeModelo,
        ordemExibicao,
        sku,
        tipoRecorte,
        posicao,
        tipoProduto,
        material,
        cor,
        imagemUrl,
      },
    });

    res.status(201).json(novoRecorte);
  } catch (error) {
    console.error('Erro ao criar recorte:', error);
    res.status(500).json({ error: 'Erro ao criar recorte' });
  }
});

module.exports = router;