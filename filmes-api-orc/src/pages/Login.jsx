import React, { useState } from "react";
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));  
    if (user && user.email === email && user.senha === senha) {
      alert("Login bem-sucedido!");
      navigate("/home");
    } else {
      alert("Email ou senha incorretos.");
    }
  };

  return (
    <div className="l-container">
      <span className="titulo">OrcMovie</span>
      <span className="subtitulo">Login</span>
      <form onSubmit={handleSubmit}>
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
        <button className="ent" type="submit">Entrar</button>
      </form>
      <p className="Possui">Não possui uma conta?</p>
      <button className="cad" onClick={() => navigate('/register')}>Cadastre-se</button>
    </div>
  );
};

export default Login;
