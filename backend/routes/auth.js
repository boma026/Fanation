const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

// Substitua isso por uma senha segura vinda do seu banco ou config
const SENHA_CORRETA = process.env.SENHA_LOGIN;

router.post('/login', (req, res) => {
  const { senha } = req.body;

  if (!senha) {
    return res.status(400).json({ error: 'Senha é obrigatória' });
  }

  if (senha !== SENHA_CORRETA) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  // Cria o token com 1 hora de validade
  const token = jwt.sign({ acesso: 'autorizado' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;