import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { Fragment } from "react";
import Loading from "../layout/Loading";
import ModalDelete from "../modal/ModalDelete";

function Home() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  const jwtToken = localStorage.getItem('token');

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
        "http://localhost:5500/api/item",
        { item: itemText },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      );
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  //Function to fetch all todo items from database
  useEffect(() => {
    setTimeout(() => {
      const getItemsList = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5500/api/items", {
              headers: {
                'Authorization': `Bearer ${jwtToken}`
              }
            }
          );
          setListItems(res.data);
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
        `http://localhost:5500/api/item/${id}`
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
        `http://localhost:5500/api/item/${isUpdating}`,
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
    <div className="Home">
      {modalDeleteOpen && <ModalDelete
      messageToDelete={currentItem.item}
      onClose={handleOnClose}
      onDelete={() => {
        deleteItem(currentItem._id);
      }}
      

      />}

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

export default Home;
