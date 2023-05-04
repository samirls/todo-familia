import "./App.css";
import Home from "./components/home/Home";
import {Outlet} from "react-router-dom";
import Header from "./components/header/Header";

function App() {

  const token = localStorage.getItem("token");


  return (
    <>
      <Header />
      {token && <Home />}
      <Outlet />
      
    </>
  )
}

export default App;
