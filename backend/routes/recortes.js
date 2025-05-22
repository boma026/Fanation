const express = require('express');
const { PrismaClient } = require('@prisma/client');
const autenticarToken = require('../middlewares/authMiddleware');
const prisma = new PrismaClient();

const router = express.Router();

// Função para gerar a chave no formato desejado
function gerarChave(tipoRecorte, nomeModelo, material, cor) {
  return `${tipoRecorte}-${nomeModelo}-${material}-${cor}`
    .toLowerCase()
    .replace(/\s+/g, '_');
}

// 🔥 GET todos recortes (autenticado)
router.get('/', autenticarToken, async (req, res) => {
  try {
    const recortes = await prisma.recorte.findMany();
    res.json(recortes);
  } catch (error) {
    console.error('Erro ao buscar recortes:', error);
    res.status(500).json({ error: 'Erro ao buscar recortes' });
  }
});

// 🔥 GET recorte por id
router.get('/:id', async (req, res) => {
  try {
    const recorte = await prisma.recorte.findUnique({
      where: { id: req.params.id },
    });
    if (!recorte) return res.status(404).json({ error: 'Recorte não encontrado' });
    res.json(recorte);
  } catch (error) {
    console.error('Erro ao buscar recorte:', error);
    res.status(500).json({ error: 'Erro ao buscar recorte' });
  }
});

// 🔥 POST criar recorte
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

    const ordemExibicaoNumber = Number(ordemExibicao);

    // Gera a chave automaticamente no formato correto
    const chave = gerarChave(tipoRecorte, nomeModelo, material, cor);

    const novoRecorte = await prisma.recorte.create({
      data: {
        chave,
        nomeModelo,
        ordemExibicao: ordemExibicaoNumber,
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
  } catch (error) {
    console.error('Erro ao criar recorte:', error);
    res.status(500).json({ error: 'Erro ao criar recorte' });
  }
});

// 🔥 PUT atualizar recorte
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

    // Regenerar a chave ao atualizar, para manter consistência
    const chave = gerarChave(tipoRecorte, nomeModelo, material, cor);

    const recorteAtualizado = await prisma.recorte.update({
      where: { id: id },
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
  } catch (error) {
    console.error('Erro ao atualizar recorte:', error);
    res.status(500).json({ error: 'Erro ao atualizar recorte' });
  }
});

module.exports = router;
