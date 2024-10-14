
import Navbar from "./component/Navbar.js";

import Shop from './pages/shop';
import Checkout from './pages/checkout';
import Home from './pages/home'; 

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() { 
  return (
   

<>

<Navbar />

<Routes>
        
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="checkout" element={<Checkout />} />
        
        
      </Routes>
     

</>

  
    
  );
}

export default App;
