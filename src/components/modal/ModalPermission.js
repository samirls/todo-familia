import "./modalPermission.css";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import SinglePermition from "../singlePermition/SinglePermition";
import Loading2 from "../layout/Loading";

function ModalPermission({ onClose2 }) {
  useEffect(() => {
    //esse é um portal feito com react.
    document.body.classList.add("overflow-hidden2");

    return () => {
      document.body.classList.remove("overflow-hidden2");
    };
  }, []);

  const [targetUserId, setTargetUserId] = useState("");
  const [userBName, setUserBName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [permissionsList, setPermissionsList] = useState([]);
  const [removeLoading2, setRemoveLoading2] = useState(false);

  const jwtToken = localStorage.getItem("token");

  const decodedToken = jwtToken ? jwt_decode(jwtToken) : null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://129.148.20.196/api/items/authorize-all",
        { targetUserId: targetUserId, userId: decodedToken.userId },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const response2 = await axios.post(
        "http://129.148.20.196/api/authorizations",
        { nameTo: userBName, permissionTo: targetUserId },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      
      setPermissionsList([...permissionsList, response2.data]);

      setShowMessage(true);
      setTargetUserId("");
      setUserBName("");
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);

    } catch (err) {
      console.error(err);
      alert("Id inválido. Tente novamente.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const getPermissionsList = async () => {
        try {
          const res = await axios.get(
            "http://129.148.20.196/api/all-authorizations", {
              headers: {
                'Authorization': `Bearer ${jwtToken}`
              }
            }
          );
          setPermissionsList(res.data);
          setRemoveLoading2(true);
        } catch (err) {
          console.log(err);
        }
      };
      getPermissionsList();
    }, 1000);
  }, []);

  const deletePermission = async (id) => {
    try {
      const res = await axios.delete(
        `http://129.148.20.196/api/permission/${id}`
      );
      const newPermissionList = permissionsList.filter((item) => item._id !== id);
      setPermissionsList(newPermissionList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (event, permissionTo, permissionFrom) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://129.148.20.196/api/items/authorize-all",
        { targetUserId: permissionTo, userId: permissionFrom },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(permissionTo)
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);

    } catch (err) {
      console.error(err);
    }
  };

  return ReactDOM.createPortal(
    <div className="modalBackground2">
      <div className="permission">
        <span onClick={onClose2}>X</span>
        <h2>Permissões</h2>
        <div>
          O seu Id é: <p><strong>{decodedToken.userId}</strong></p>
        </div>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              Quer ver tarefas de outros usuários? Para ilustrar, vou te chamar
              de usuário A. Outro usuário será chamado de usuário B.
            </li>
            <li>
              Para o usuário A ver as tarefas do usuário B é necessário que o
              usuário B envie o ID do usuário A. Informe para eles o seu ID!
            </li>
            <li>
              Para o usuário B ver as tarefas do usuário A é necessário que o
              usuário A envie o ID do usuário B. Envie neste formulário!
            </li>
            <li>
              <strong>SEMPRE</strong> que você adicionar novas tarefas e quiser 
              compartilhá-las com outros usuários você deverá clicar no botão atualizar.
            </li>
            <li>É possível adicionar quantos usuários você quiser.</li>
            <li>
              Qualquer usuário poderá ver, editar, deletar e postar tarefas.
            </li>
          </ul>
          <p>
            Coloque abaixo um Nome e o Id do usuário B, para autorizá-lo ver as suas
            tarefas:
          </p>
          <input
            value={userBName}
            type="text"
            required
            placeholder="Dê um nome ao Usuário B"
            onChange={(e) => setUserBName(e.target.value)}
          />
          <input
            value={targetUserId}
            type="text"
            required
            placeholder="Id do usuário B"
            onChange={(e) => setTargetUserId(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
        <button className="cancelarButton" onClick={onClose2}>Cancelar</button>
        <div className="allPermitions">
          <h4>Quem pode ver suas tarefas:</h4>
          {permissionsList.length === 0 ? (<div>Nenhuma permissão 
            encontrada</div>) : null}
          {permissionsList.map((item, index) => 
          (<SinglePermition 
            name={item.nameTo} 
            onDelete2= {() => {deletePermission(item._id)}}
            updatePermissions={(e) => handleUpdate (e, item.permissionTo, item.permissionFrom)}
            permissionTo={item.permissionTo}
            permissionFrom={item.permissionFrom}
            key={index}/>))}
            
          {!removeLoading2 && <Loading2 />}
        </div>
        {showMessage && <p className="showPermissionMessage">Sucesso!</p>}
      </div>
    </div>,
    document.querySelector(".modal-container2")
  );
}

export default ModalPermission;
