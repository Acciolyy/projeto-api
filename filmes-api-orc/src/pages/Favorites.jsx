import React, { useEffect, useState } from "react";
import { use } from "react";

const Favorites = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setNome(storedUser.nome);
      setEmail(storedUser.email);
      setSenha(storedUser.senha);
    }
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

  const updatedUser = { nome, email, senha};
  localStorage.setItem("user", JSON.stringify(updatedUser));

  alert("Dados atualizados com sucesso!");

  };

  return (
    <div className="profile-container">
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSave}>
        <label>
          Nome:
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </label>
        <label>
          Senha:
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
          />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default Favorites;
