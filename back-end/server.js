const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// conexão com banco remoto usando variáveis de ambiente do Railway
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,        // Railway usa MYSQLHOST (sem o underline)
    user: process.env.MYSQLUSER,        // Railway usa MYSQLUSER
    password: process.env.MYSQLPASSWORD, // Railway usa MYSQLPASSWORD
    database: process.env.MYSQLDATABASE, // Railway usa MYSQLDATABASE
    port: process.env.MYSQLPORT          // É bom adicionar a porta também!
});

db.connect((err) => {
    if (err) {
        console.log("Erro ao conectar:", err);
    } else {
        console.log("MySQL conectado ✅");
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