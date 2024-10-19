import Navbar from "./component/Navbar.js";
import Shop from './pages/shop';
import CheckoutPage from './pages/CheckoutPage.js';
import HomePage from './pages/HomePage.js'; 
import LoginPage from './pages/login/LoginPage.js';
import RegisterPage from "./pages/register/RegisterPage.js";
import CartPage from "./pages/Cart/CartPage.js";
import OrderHistory from "./component/OrderHistory.js";
import AdminPanel from "./component/AdminPanel.js";
import { AdminProvider } from "./component/AdminContext.js";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

function App() { 
  return (
    <UserProvider>   
      <CartProvider>
        <Navbar />
        <AdminProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="shop" element={<Shop />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage/>} />
            <Route path="cart" element={<CartPage/>} />
            <Route path="order" element={<OrderHistory/>} />
            <Route path="admin-panel" element={<AdminPanel />} />
          </Routes>
        </AdminProvider>
        <ToastContainer />
      </CartProvider> 
    </UserProvider>   
  );
}

export default App;
