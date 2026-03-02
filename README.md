# 💻 Fullstack Product Manager

Sistema Fullstack para gerenciamento de produtos, permitindo cadastrar, listar, editar e deletar produtos.
Projeto desenvolvido com React no frontend e Node.js + Express no backend, com deploy em nuvem.

---

🛠️ Tecnologias Utilizadas
Frontend
React
Axios
CSS
Vercel (Deploy)

Backend
Node.js
Express
CORS
Render (Deploy)
---

## 🚀 Funcionalidades

- **CRUD completo:**  
  - **C**adastrar produtos  
  - **R**eceber lista de produtos  
  - **U**pdate: editar produtos  
  - **D**elete: remover produtos  

- **Frontend conectado à API** via Axios  
- Atualização da lista em tempo real após ações no formulário  
- Layout simples e funcional para testes e aprendizado  

---

## 📂 Estrutura do projeto

```text
fullstack-product-manager
│
├── back-end
│   ├── server.js       # API com CRUD
│   └── package.json
│
└── front-end
    ├── src
    │   └── App.jsx    # Interface principal com formulário e lista
    └── package.json

---

## ⚡ Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/fullstack-product-manager.git

2. Backend:

cd fullstack-product-manager/back-end
npm install
node server.js

3. Frontend:

cd ../front-end
npm install
npm run dev
Frontend rodando em: http://localhost:5173
