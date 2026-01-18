import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // ✅ This line is REQUIRED
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

      window.addEventListener('load', () => {
        setTimeout(() => {
          const splash = document.getElementById('splash-screen');
          if (splash) {
            splash.classList.add('fade-out');
            setTimeout(() => splash.remove(), 1000);
          }
        }, 2000); // show splash for 5 seconds
      });