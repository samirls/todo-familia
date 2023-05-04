import "./instructions.css";

function Instructions() {

  return (
    <div className="instructions">
      <h1>Bem vindo!</h1>
      <p>Este é um <i>WebApp</i> para ajudar na organização das tarefas da <strong>sua Família</strong>. O que deve ser feito? Escreva aqui e todos saberão!</p>
      <h2>Como usar este app?</h2>
      <ul>
        <li>Todos os membros da família devem fazer o Cadastro e depois Login;</li>
        <li>Na página Home, leia as tarefas a serem feitas;</li>
        <li>Edite tarefas;</li>
        <li>Crie novas tarefas;</li>
        <li>Delete tarefas já realizadas;</li>
      </ul>
    </div>
  );
}

export default Instructions;
