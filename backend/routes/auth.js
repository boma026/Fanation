const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

const SENHA_CORRETA = process.env.SENHA_LOGIN; //le a senha correta pelo arquivo env

router.post('/login', (req, res) => {
  const { senha } = req.body;

  // verificar se a senha foi de fato enviada
  if (!senha) {
    return res.status(400).json({ error: 'Senha é obrigatória' });
  }

  if (senha !== SENHA_CORRETA) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  // Cria o token com 1h de validade
  const token = jwt.sign({ acesso: 'autorizado' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;