import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NewPage from './NewPage'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

if (window.location.pathname === '/newPage.html') {
  root.render(
    <React.StrictMode>
      <NewPage /> {/* Render NewPage when the path is /newPage.html */}
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App /> {/* Default rendering for the rest of the app */}
    </React.StrictMode>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
