import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

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

    const data = {
      nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
    };

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
    <div className="container">
      <h1 className="title">Fullstack Product Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <button className="cadastrar" type="submit">
          {editId ? "Atualizar" : "Cadastrar"}
        </button>
        {editId && <button className="cancelar" onClick={resetForm}>Cancelar</button>}
      </form>

      <h2 className="subtitle">Produtos Cadastrados</h2>
      <ul className="product-list">
        {produtos.map((produto) => (
          <li className="list-item" key={produto.id}>
            <span>
              {produto.nome} - R$ {produto.preco} -  {produto.quantidade} Unidades
            </span>

            <div className="buttons">
              <button onClick={() => handleEdit(produto)}>Editar</button>
              <button onClick={() => handleDelete(produto.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
