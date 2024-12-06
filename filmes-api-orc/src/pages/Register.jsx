import React, { useState } from "react";
import '../styles/Register.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = { nome, email, senha };
    localStorage.setItem("user", JSON.stringify(user)); 

    alert("Usuário cadastrado com sucesso!");
    navigate("/login");  
  };

  return (
    <div className="r-container">
      <span className="titulo">OrcMovie</span>
      <span className="subtitulo">Cadastro</span>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button className="cadr" type="submit">Cadastrar-se</button>
      </form>
      <p>Você já possui uma conta?</p>
      <button className="log" onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default Register;
