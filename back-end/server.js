const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let produtos = [];
let idAtual = 1;

// GET - listar
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// POST - criar
app.post('/produtos', (req, res) => {
  const novoProduto = {
    id: idAtual++,
    ...req.body
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// PUT - atualizar
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = produtos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  }

  produtos[index] = { id, ...req.body };
  res.json(produtos[index]);
});

// DELETE - remover
app.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  produtos = produtos.filter(p => p.id !== id);

  res.json({ mensagem: "Produto removido" });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});