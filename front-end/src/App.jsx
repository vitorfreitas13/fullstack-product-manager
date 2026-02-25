import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:3001/produtos";

  // Carregar produtos
  const fetchProdutos = () => {
    axios
      .get(API_URL)
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Cadastrar ou atualizar produto
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { nome, preco: parseFloat(preco), quantidade: parseInt(quantidade) };

    if (editId) {
      // UPDATE
      axios
        .put(`${API_URL}/${editId}`, data)
        .then(() => {
          fetchProdutos();
          resetForm();
        })
        .catch((err) => console.error(err));
    } else {
      // CREATE
      axios
        .post(API_URL, data)
        .then(() => {
          fetchProdutos();
          resetForm();
        })
        .catch((err) => console.error(err));
    }
  };

  // Preparar formulário para edição
  const handleEdit = (produto) => {
    setEditId(produto.id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setQuantidade(produto.quantidade);
  };

  // Deletar produto
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => fetchProdutos())
      .catch((err) => console.error(err));
  };

  // Resetar formulário
  const resetForm = () => {
    setEditId(null);
    setNome("");
    setPreco("");
    setQuantidade("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Fullstack Product Manager</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={{ marginRight: "5px" }}
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          style={{ marginRight: "5px" }}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
          style={{ marginRight: "5px" }}
        />
        <button type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
        {editId && <button onClick={resetForm} style={{ marginLeft: "5px" }}>Cancelar</button>}
      </form>

      <h2>Produtos</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id} style={{ marginBottom: "5px" }}>
            {produto.nome} - R$ {produto.preco} - Qtd: {produto.quantidade}{" "}
            <button onClick={() => handleEdit(produto)} style={{ marginLeft: "5px" }}>Editar</button>
            <button onClick={() => handleDelete(produto.id)} style={{ marginLeft: "5px" }}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;