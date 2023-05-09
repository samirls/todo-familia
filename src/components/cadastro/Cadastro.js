import "./cadastro.css";
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function Cadastro() {

  const [showMessage, setShowMessage] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    familyName: '',
    email: '',
    password: '',
    sex: '',
    color: '',
    age: ''
  });
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://129.148.20.196/api/signup', formData);
      const { token, userId } = response.data;
      setShowMessage(true);
      setFormData({
        userName: '',
        familyName: '',
        email: '',
        password: '',
        sex: '',
        color: '',
        age: ''
      })
      setTimeout(() => {
        setShowMessage(false);
        handleNavigate();
      }, 6000);
      
      // exibir mensagem de sucesso para o usuário, redirecionar ou fazer o que for necessário com o token e o userId
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    return navigate("/TODO/login")
  }


  return (
    <div className="cadastro">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="Seu primeiro nome" value={formData.userName} onChange={handleChange} required/>
        <input type="text" name="familyName" placeholder="Nome da Família" value={formData.familyName} onChange={handleChange} required/>
        <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} autoComplete="current-email" required/>
        <input type="password" name="password" placeholder="Senha / Password" value={formData.password} onChange={handleChange} autoComplete="current-password" required/>
        
        <select name="sex" value={formData.sex} onChange={handleChange} required>
          <option disabled hidden value="">Selecione seu sexo:</option>
          <option>Masculino</option>
          <option>Feminino</option>
          <option>Não Responder</option>
        </select>
        <select name="color" value={formData.color} onChange={handleChange} required>
          <option disabled hidden value="">Selecione uma cor:</option>
          <option>Azul</option>
          <option>Verde</option>
          <option>Preto</option>
          <option>Rosa</option>
        </select>
        <select name="age" value={formData.age} onChange={handleChange} required>
          <option disabled hidden value="">Selecione sua faixa etária:</option>
          <option>0 a 20 anos</option>
          <option>21 a 30 anos</option>
          <option>31 a 50 anos</option>
          <option>51 ou mais anos</option>
        </select>
        <button className="loginButton" type="submit">Cadastrar</button>
      </form>
      {showMessage && <p className="showMessage">Usuário cadastrado com sucesso! Redirecionando para efetuar Login.</p>}
    </div>
  );
}

export default Cadastro;
