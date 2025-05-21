const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const autenticarToken = require('../middlewares/authMiddleware'); // CORRIGIDO O CAMINHO
const prisma = new PrismaClient();

// GET /recortes - protegido com autenticação
router.get('/', autenticarToken, async (req, res) => {
  try {
    const recortes = await prisma.recorte.findMany();
    res.json(recortes);
  } catch (error) {
    console.error('Erro ao buscar recortes:', error);
    res.status(500).json({ error: 'Erro ao buscar recortes' });
  }
});

// POST /recortes - criar novo recorte (você pode proteger aqui também se quiser)
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
