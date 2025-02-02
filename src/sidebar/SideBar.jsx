import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth
import { signOut } from "firebase/auth"; // Import signOut method
import "./SideBar.css";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log("User logged out successfully");
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      <ul className="sidebar-menu">
        <li className={`menu-item ${activeItem === "/user" ? "active" : ""}`}>
          <Link to="/user">👤 Users</Link>
        </li>
        <li className={`menu-item ${activeItem === "/product" ? "active" : ""}`}>
          <Link to="/product">🛍️ Products</Link>
        </li>
        <li className={`menu-item ${activeItem === "/likes" ? "active" : ""}`}>
          <Link to="/likes">❤️ Likes</Link>
        </li>
        <li className={`menu-item ${activeItem === "/cart" ? "active" : ""}`}>
          <Link to="/cart">🛒 Cart</Link>
        </li>
        <li className={`menu-item ${activeItem === "/comment" ? "active" : ""}`}>
          <Link to="/comments">💬 Comments</Link>
        </li>
        <li
          className={`menu-item logout ${activeItem === "/login" ? "active" : ""}`}
          onClick={handleLogout} 
        >
          <span>🚪 Logout</span> 
        </li>
      </ul>
    </div>
  );
};

export default SideBar;