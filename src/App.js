
import Navbar from "./component/Navbar.js";

import Shop from './pages/shop';
import CheckoutPage from './pages/CheckoutPage.js';
import HomePage from './pages/HomePage.js'; 
import LoginPage from './pages/login/LoginPage.js'
import RegisterPage from "./pages/register/RegisterPage.js";
import CartPage from "./pages/Cart/CartPage.js";

import { Routes, Route } from "react-router-dom";


function App() { 
  return (
   

<>

<Navbar />

<Routes>
        
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage/>} />
          <Route path="cart" element={<CartPage/>} />
      </Routes>
     

</>

  
    
  );
}

export default App;
