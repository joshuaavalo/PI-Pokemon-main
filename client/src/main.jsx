import axios from "axios";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

const url = import.meta.env.VITE_URL;
axios.defaults.baseURL = url;   // configuracion para deploy 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store= {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
 </React.StrictMode>
);