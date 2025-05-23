Fanation

Sistema de Criação de Modelos de bonés com Montagem de Imagens

O Fanation é uma aplicação web desenvolvida para facilitar a criação e gerenciamento de modelos personalizados com montagem de imagens. O sistema permite que usuários criem peças visuais combinando diferentes tipos de recorte (aba,frente,lateral) de modelos de boné , como materiais, cores e tipos, de forma intuitiva e eficiente.

🚀 Tecnologias Utilizadas:

    Frontend: React com TypeScript

    Backend: Node.js com Express

    Estilização: Tailwind CSS

    Gerenciamento de Estado: React Hooks (useState, useEffect)

    Upload de Imagens: Manipulação via FormData e fetch API, com integração com o banco de dados postgreSQL e com a nuvem Cloudnary

    Autenticação: Token JWT armazenado no localStorage
    GitHub+5GitHub+5GitHub+5
    GitHub+3Microsoft Learn+3GitHub+3

📁 Estrutura do Projeto:

  Fanation/
  ├── backend/
  │   └── ... (código do servidor e rotas da API)
  ├── front-end/
  │   ├── components/
  │   │   └── RecorteForm.tsx
  │   ├── pages/
  │   │   └── nova-peca.tsx
  │   └── services/
  │       └── recortes.ts
  ├── package.json
  └── README.md
  
⚙️ Instalação e Execução

    Clone o repositório:

    git clone https://github.com/boma026/Fanation.git

    Instale as dependências do frontend e backend:

    cd Fanation/front-end
    npm install

    cd ../backend
    npm install

    Configure as variáveis de ambiente:

    Crie um arquivo .env em ambos os diretórios (front-end e backend) com as variáveis necessárias, como NEXT_PUBLIC_API_URL no frontend e configurações de porta e banco de dados no backend.

    Inicie o servidor backend:

    cd backend
    node index.js

    Inicie o frontend:

    cd front-end
    npm run dev

    Acesse a aplicação:

    Abra o navegador e vá para http://localhost:3000 para utilizar o sistema.

📝 Funcionalidades

    Criação de modelos personalizados com seleção de tipo de recorte, material e cor.

    Upload de imagens para visualização e associação aos modelos.

    Geração automática de chave identificadora baseada nas características do modelo.

    Formulário dinâmico com validações e feedback ao usuário.
