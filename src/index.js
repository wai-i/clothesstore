import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './scss/main.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store";
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
