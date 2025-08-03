# 🧢 Fanation

Sistema de Criação de Modelos de Bonés com Montagem de Imagens

O Fanation é uma aplicação web desenvolvida para facilitar a criação e o gerenciamento de modelos personalizados de bonés. O sistema permite que usuários combinem diferentes tipos de recortes (aba, frente, lateral), materiais, cores e estilos, montando visualmente suas peças de forma prática e intuitiva.

## 🚀 Tecnologias Utilizadas

    Frontend: React + TypeScript

    Backend: Node.js + Express

    Estilização: Tailwind CSS

    Gerenciamento de Estado: React Hooks (useState, useEffect)

    Upload de Imagens: FormData + fetch API com integração:

        Banco de dados PostgreSQL

        Armazenamento em nuvem via Cloudinary

    Autenticação: JWT com token armazenado no localStorage

## 📁 Estrutura do Projeto
```
Fanation/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── prisma/
│   ├── routes/
│   └── index.js
│
├── front-end/
│   ├── public/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── services/
```

## ⚙️ Instalação e Execução
1. Clone o repositório

git clone https://github.com/boma026/Fanation.git

2. Instale as dependências

### Frontend
cd Fanation/front-end
npm install

### Backend
cd ../backend
npm install

3. Configure as variáveis de ambiente

Crie um arquivo .env nos diretórios backend/ e front-end/ com os dados apropriados.

Exemplo - backend/.env:

PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/fanation
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@cloud_name
JWT_SECRET=sua_chave_secreta

Exemplo - front-end/.env:

NEXT_PUBLIC_API_URL=http://localhost:4000

4. Inicie os servidores

### Backend
cd backend
node index.js

### Frontend
cd ../front-end
npm run dev


5. Acesse a aplicação

Abra no navegador:

http://localhost:3000

## 📝 Funcionalidades

    ✅ Criação de modelos de bonés personalizados

    ✅ Seleção de tipo de recorte (aba, frente, lateral)

    ✅ Escolha de material e cor do tecido

    ✅ Upload de imagens com pré-visualização

    ✅ Geração automática de chave identificadora única (SKU)

    ✅ Formulário com validações e feedback ao usuário

    ✅ Autenticação por token JWT
