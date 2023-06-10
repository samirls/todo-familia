import "./login.css";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/login`, {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      // redirecionar para a página após o login
      window.location.href = "/TODO";
    } catch (error) {
      console.error(error);
      alert("Usuário ou Senha inválidos. Tente novamente.");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="current-email"
        />
        <input
          type="password"
          placeholder="Senha / Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit" className="loginButton">Login</button>
      </form>
    </div>
  );
}

export default Login;
