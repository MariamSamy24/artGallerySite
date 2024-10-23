import Navbar from "./component/Navbar.js";
import CheckoutPage from './pages/CheckoutPage.js';
import HomePage from './pages/HomePage.js'; 
import LoginPage from './pages/login/LoginPage.js';
import RegisterPage from "./pages/register/RegisterPage.js";
import CartPage from "./pages/Cart/CartPage.js";
import OrderConfirmationPage from "./pages/OrderConfirmation/OrderConfirmationPage.js"
import OrderHistory from "./component/OrderHistory.js";
import SuccessPage from "./pages/ResponsePayment/SuccessPage.js";
import CancelPage from "./pages/ResponsePayment/CancelPage.js";
import AdminPanel from "./component/AdminPanel.js";
import ProductPage from "./pages/product/ProductPage.js";
import ProductDetailsPage from "./pages/product/ProductDetailsPage.js";
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
            <Route path="shop" element={<ProductPage />} />
            <Route path="shop/:id" element={<ProductDetailsPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage/>} />
            <Route path="cart" element={<CartPage/>} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="cancel" element={<CancelPage/>} />
            <Route path="success" element={<SuccessPage/>} />
            <Route path="orders" element={<OrderHistory/>} />
            <Route path="admin-panel" element={<AdminPanel />} />
          </Routes>
        </AdminProvider>
        <ToastContainer />
      </CartProvider> 
    </UserProvider>   
  );
}

export default App;
