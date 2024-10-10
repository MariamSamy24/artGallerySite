import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './component/nav.css';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import home from './pages/home';
import shop from './pages/shop';
import checkout from './pages/checkout';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

<BrowserRouter>
      <Routes>
        <Route path="Navbar" element={<Navbar />}>
          <Route index element={<home />} />
          <Route path="shop" element={<shop />} />
          <Route path="checkout" element={<checkout />} />
        
        </Route>
      </Routes>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
