import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './utilities/auto-key-lists';
import { BrowserRouter } from 'react-router-dom';

import './scss/style.scss';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
