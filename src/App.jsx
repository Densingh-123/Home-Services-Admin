import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import Home from "./home/Home";
import Services from "./services/Services";
import Users from "./users/Users";
import Products from "./products/Products";
import Liked from "./liked/Liked";
import Cart from './cart/Cart'
import Comments from "./comments/Comments";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/service" element={<Services/>}/>
        <Route path="/user" element={<Users/>}/>
        <Route path="/product" element={<Products/>}/>
        <Route path="/likes" element={<Liked/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/comments" element={<Comments/>}/>
      </Routes>
    </Router>
  );
}

export default App;
