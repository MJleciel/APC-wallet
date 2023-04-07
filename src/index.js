import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import '../src/assests/css'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Buffer } from "buffer";
import ContextState from './context/globalState';
window.Buffer = window.Buffer || Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextState>
    <ProSidebarProvider>
      <Router>
        <App />
      </Router>
    </ProSidebarProvider>
  </ContextState>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
