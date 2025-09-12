import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- IMPORT
import App from './App';
import './style.css';
import 'aos/dist/aos.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- WRAP APP */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);