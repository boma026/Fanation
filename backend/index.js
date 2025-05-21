const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const recortesRoutes = require('./routes/recortes');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/upload', uploadRoutes);
app.use('/', authRoutes);
app.use('/recortes', recortesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));