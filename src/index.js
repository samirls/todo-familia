import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from "./components/login/Login"
import Cadastro from "./components/cadastro/Cadastro"
import Instructions from './components/instructions/Instructions';

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: '/TODO',
    element: <App />,
    children: [
      {
        path: '/TODO',
        element: token ? null : <Instructions />,
      },
      {
        path: '/TODO/login',
        element: <Login />,
      },
      {
        path: '/TODO/cadastro',
        element: <Cadastro />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
