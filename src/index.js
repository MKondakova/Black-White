import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {strings} from "./language"

let lang = localStorage.getItem('language')
if (lang === undefined) lang = "ru"
strings.setLanguage(lang);

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
