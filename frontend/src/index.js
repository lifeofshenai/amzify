import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import "./index.css";
import Providers from "./context/Providers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Providers>
      <App />
      <ToastContainer position="top-center" />
    </Providers>
  </BrowserRouter>
);
