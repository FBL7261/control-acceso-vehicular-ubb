import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './routes/App';
//import './index.css';
//import './styles/Login.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);