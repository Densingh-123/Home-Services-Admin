import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import path as necessary
import SideBar from '../sidebar/SideBar';
import './Cart.css'; // Ensure you create a CSS file for styling

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'Cart'));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCartItems(items);
  };

  const removeItem = async (itemId) => {
    await deleteDoc(doc(db, 'Cart', itemId));
    fetchCartItems(); // Refresh the list after removal
  };

  return (
    <>
      <SideBar />
      <div className="cart-container" style={{position:'relative',left:120}}>
        <h1 className="cart-title">Your Cart</h1>
        {cartItems.length > 0 ? (
          <div className="cart-items-grid">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <h2 className="item-name">{item.name}</h2>
                  <p className="item-description">{item.description}</p>
                  <div className="item-details">
                    <p><span className="detail-label">Address:</span> {item.address}</p>
                    <p><span className="detail-label">Contact:</span> {item.contact}</p>
                    <p><span className="detail-label">Email:</span> {item.userEmail}</p>
                    
                  </div>
                  <button onClick={() => removeItem(item.id)} className="remove-button">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart-message">
            <p>Your cart is empty.</p>
            <p className="emoji">😢</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;