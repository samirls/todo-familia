import "./singlePermition.css"

function SinglePermition({name, onDelete2, updatePermissions}) {
  return (
    <div className="singlePermitionContainer">
      <div>{name}</div>
      <div className="updateAndDeleteButtons">
        <button onClick={updatePermissions}>Atualizar</button>
        <button onClick={onDelete2}>Deletar</button>
      </div>
    </div>
  )
}

export default SinglePermition