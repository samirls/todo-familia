import "./modalDelete.css"
import { useEffect } from "react";
import ReactDOM from 'react-dom';

function Modal({messageToDelete, onClose, onDelete}) {
  useEffect(() => {
    //esse é um portal feito com react. 
    //modalDelete.css possui a classe 'overflow-hidden'
    //modalBackground precisa ter inset = 0 e position absolute
    document.body.classList.add('overflow-hidden')
    

    return () => {
      document.body.classList.remove("overflow-hidden") ;
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modalBackground">
      <div className="modalBox">
        <div>Deseja apagar: <span className="messageToDeleteStyles">{messageToDelete}</span> ?</div>
        <div className="buttons">
          <div><button className="deleteButton" onClick={onDelete}>Deletar</button></div>
          <div><button className="cancelButton" onClick={onClose}>Cancelar</button></div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  )
}

export default Modal