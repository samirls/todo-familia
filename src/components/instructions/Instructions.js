import "./instructions.css";

function Instructions() {
  return (
    <div className="instructions">
      <h1>Bem vindo!</h1>
      <p>
        Este é um <i>WebApp</i> para ajudar na organização das tarefas da{" "}
        <strong>sua Família</strong>. O que deve ser feito? Escreva aqui e todos
        saberão!
      </p>
      <h2>O que essa App faz?</h2>
      <ul>
        <li>
          Você pode organizar as tarefas da sua família neste App, como por exemplo "comprar manteiga no supermercado".
        </li>
        <li>Adicione membros da sua família no App. Assim eles poderão ler, escrever ou deletar tarefas.</li>
        <li>Não se esqueça de abrir o App e conferir as tarefas diariamente!</li>
        <li>Abandone os recadinhos na geladeira ou lista de compras no papel!</li>

      </ul>
      <footer>
        <div>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://samirls.github.io/samirlaguardia/"
          >
            Created by <strong>samirls</strong>
          </a>
        </div>

      </footer>
    </div>
  );
}

export default Instructions;
