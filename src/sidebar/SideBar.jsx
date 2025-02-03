import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import "./SideBar.css";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Logic for going back to the previous page
  const handleGoBack = () => {
    navigate(-1); // This navigates the user back to the previous page
  };

  return (
    <>
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={`menu-item ${activeItem === "/user" ? "active" : ""}`}>
            <Link to="/user">👤 Users</Link>
          </li>
          <li className={`menu-item ${activeItem === "/add" ? "active" : ""}`}>
            <Link to="/add">↩️ ADD</Link>
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
          <li className="menu-item logout" onClick={handleLogout}>
            <span>🚪 Logout</span>
          </li>
        </ul>
        
        {/* Go Back button */}
        {location.pathname === "/add" && (
          <button onClick={handleGoBack} className="go-back-btn">
            ↩️ Go Back
          </button>
        )}
      </div>
    </>
  );
};

export default SideBar;
