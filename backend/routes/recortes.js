const express = require('express');
const { PrismaClient } = require('@prisma/client');
const autenticarToken = require('../middlewares/authMiddleware');
const cloudinary = require('../config/cloudinary');

const prisma = new PrismaClient();
const router = express.Router();

function gerarChave(tipoRecorte, nomeModelo, material, cor) {
  return `${tipoRecorte}-${nomeModelo}-${material}-${cor}`
    .toLowerCase()
    .replace(/\s+/g, '_');
}

function extrairPublicId(url) {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const partes = urlObj.pathname.split('/upload/');

    if (partes.length < 2) return null;

    const partesCaminho = partes[1].split('/');
    if (partesCaminho[0].startsWith('v') && /^\d+$/.test(partesCaminho[0].substring(1))) {
      partesCaminho.shift();
    }

    let publicId = partesCaminho.join('/');
    if (publicId.endsWith('.png.png')) {
      publicId = publicId.slice(0, -4);
    }

    return publicId;
  } catch {
    return null;
  }
}

// GET todos recortes
router.get('/', autenticarToken, async (req, res) => {
  try {
    const recortes = await prisma.recorte.findMany();
    res.json(recortes);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar recortes' });
  }
});

// GET recorte por id
router.get('/:id', async (req, res) => {
  try {
    const recorte = await prisma.recorte.findUnique({
      where: { id: req.params.id },
    });
    if (!recorte) {
      return res.status(404).json({ error: 'Recorte não encontrado' });
    }
    res.json(recorte);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar recorte' });
  }
});

// POST criar recorte
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
      ativo = true,
    } = req.body;

    const chave = gerarChave(tipoRecorte, nomeModelo, material, cor);

    const novoRecorte = await prisma.recorte.create({
      data: {
        chave,
        nomeModelo,
        ordemExibicao: Number(ordemExibicao),
        sku,
        tipoRecorte,
        posicao,
        tipoProduto,
        material,
        cor,
        imagemUrl,
        ativo,
      },
    });

    res.status(201).json(novoRecorte);
  } catch {
    res.status(500).json({ error: 'Erro ao criar recorte' });
  }
});

// PUT atualizar recorte
router.put('/:id', autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
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
      ativo,
    } = req.body;

    const chave = gerarChave(tipoRecorte, nomeModelo, material, cor);

    const recorteAtualizado = await prisma.recorte.update({
      where: { id },
      data: {
        chave,
        nomeModelo,
        ordemExibicao: Number(ordemExibicao),
        sku,
        tipoRecorte,
        posicao,
        tipoProduto,
        material,
        cor,
        imagemUrl,
        ativo: ativo === 'true' || ativo === true,
      },
    });

    res.json(recorteAtualizado);
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar recorte' });
  }
});

// DELETE recorte (com imagem)
router.delete('/:id', autenticarToken, async (req, res) => {
  const { id } = req.params;

  try {
    const recorte = await prisma.recorte.findUnique({ where: { id } });
    if (!recorte) return res.status(404).json({ error: 'Recorte não encontrado' });

    const publicId = extrairPublicId(recorte.imagemUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    }

    await prisma.recorte.delete({ where: { id } });

    res.json({ message: 'Recorte e imagem excluídos com sucesso' });
  } catch {
    res.status(500).json({ error: 'Erro ao excluir recorte' });
  }
});

module.exports = router;
