import "./header.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";

function Header() {

  const [familyNameClass, setFamilyNameClass] = useState("")

  const jwtToken = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const decodedToken = jwtToken ? jwt_decode(jwtToken) : null;

  const changeColor = () => {
    if (decodedToken) {
      if (decodedToken.color === "Azul") {
        setFamilyNameClass("azul");
      }
      if (decodedToken.color === "Verde") {
        setFamilyNameClass("verde");
      }
      if (decodedToken.color === "Preto") {
        setFamilyNameClass("preto");
      }
      if (decodedToken.color === "Rosa") {
        setFamilyNameClass("rosa");
      }
    }
  };

  useEffect(() => {
    if (decodedToken) {
      changeColor();
    }
  }, [decodedToken]);



  return (
    <div className="header">
      <h2>Lista de Tarefas da </h2>
      {jwtToken ? (
        <h1>
          Família{" "}
          <span className={`familyName ${familyNameClass}`}>
            {decodedToken.familyName.toUpperCase()}
          </span>
        </h1>
      ) : (
        <h1>Sua Família</h1>
      )}
      {jwtToken && <p>Olá <span className={familyNameClass}>{decodedToken ? decodedToken.userName : ""}</span>!</p>}
      <div className="links">
        {!jwtToken && (
          <h3>
            <Link className="link" to="/TODO">
              Home
            </Link>
          </h3>
        )}
        {!jwtToken && (
          <h3>
            <Link className="link" to="/TODO/login">
              Login
            </Link>
          </h3>
        )}
        {jwtToken && (
          <h3>
            <Link className="link" onClick={logout}>
              Logout
            </Link>
          </h3>
        )}
        {!jwtToken && (
          <h3>
            <Link className="link" to="/TODO/cadastro">
              Cadastro
            </Link>
          </h3>
        )}
      </div>
    </div>
  );
}

export default Header;
