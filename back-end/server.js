
require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.log("Erro ao conectar:", err);
    } else {
        console.log("MySQL conectado ✅");

        const sql = `
        CREATE TABLE IF NOT EXISTS produtos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            preco DECIMAL(10,2) NOT NULL,
            quantidade INT NOT NULL
        );`;

        db.query(sql, (err) => {
            if (err) console.log("Erro ao criar tabela:", err);
            else console.log("Tabela 'produtos' pronta para uso! 🚀");
        });
    }
});

// rota de teste
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

// CRUD produtos
app.post("/produtos", (req, res) => {
    const { nome, preco, quantidade } = req.body;
    const sql = "INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)";
    db.query(sql, [nome, preco, quantidade], (err, result) => {
        if (err) return res.status(500).send("Erro ao cadastrar produto");
        res.send("Produto cadastrado com sucesso ✅");
    });
});

app.get("/produtos", (req, res) => {
    const sql = "SELECT * FROM produtos";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send("Erro ao buscar produtos");
        res.json(result);
    });
});

app.put("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const { nome, preco, quantidade } = req.body;
    const sql = "UPDATE produtos SET nome=?, preco=?, quantidade=? WHERE id=?";
    db.query(sql, [nome, preco, quantidade, id], (err, result) => {
        if (err) return res.status(500).send("Erro ao atualizar produto");
        res.send("Produto atualizado com sucesso ✅");
    });
});

app.delete("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM produtos WHERE id=?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send("Erro ao deletar produto");
        res.send("Produto deletado com sucesso ✅");
    });
});

// usar a porta que o Railway fornece
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});