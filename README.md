# 💻 Fullstack Product Manager

Projeto **Fullstack** completo para gerenciamento de produtos, desenvolvido com **Node.js, MySQL, React e Vite**.  
Permite **cadastrar, listar, editar e deletar produtos** diretamente pelo frontend.

---

## 🛠 Tecnologias

- **Backend:** Node.js, Express, MySQL  
- **Frontend:** React + Vite, Axios  
- **Banco de dados:** MySQL (local ou online)  
- **Testes de API:** Thunder Client / Postman  

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
