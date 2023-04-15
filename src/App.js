import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Fragment } from "react";
import Loading from "./components/layout/Loading";
import ModalDelete from "./components/modal/ModalDelete";

function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  //Modal for confirm delete
  const handleModalDelete = (item) => {
    setModalDeleteOpen(true);
    setCurrentItem(item);
  };
  const handleOnClose = () => {
    setModalDeleteOpen(false);
  };

  //add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api-todo-familia.onrender.com/api/item",
        { item: itemText }
      );
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  //Create function to fetch all todo items from database -- we will use useEffect hook
  useEffect(() => {
    setTimeout(() => {
      const getItemsList = async () => {
        try {
          const res = await axios.get(
            "https://api-todo-familia.onrender.com/api/items"
          );
          setListItems(res.data);
          console.log("render");
          setRemoveLoading(true);
        } catch (err) {
          console.log(err);
        }
      };
      getItemsList();
    }, 1000);
  }, []);

  // Delete item when click on delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://api-todo-familia.onrender.com/api/item/${id}`
      );
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
      setModalDeleteOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  //Update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://api-todo-familia.onrender.com/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
      setUpdateItemText("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <button className="update-new-btn" type="submit">
        Modificar
      </button>
    </form>
  );

  return (
    <div className="App">
      {modalDeleteOpen && <ModalDelete
      messageToDelete={currentItem.item}
      onClose={handleOnClose}
      onDelete={() => {
        deleteItem(currentItem._id);
      }}
      

      />}
      <h2>Lista de Tarefas da </h2>
      <h1>Familia Laguardia</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Escreva alguma coisa a ser feita"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <button type="submit">Adicionar</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item, index) => (
          <div className="todo-item" key={index}>
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <Fragment>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(item._id);
                  }}
                >
                  Modificar
                </button>
                <button className="delete-item" onClick={() => handleModalDelete(item)}>
                  Já fiz / Deletar
                </button>
              </Fragment>
            )}
          </div>
        ))}
        {!removeLoading && <Loading />}
      </div>
    </div>
  );
}

export default App;
