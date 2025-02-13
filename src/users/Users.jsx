import React, { useEffect, useState } from 'react';
import SlideBar from '../sidebar/SideBar';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaUser, FaEnvelope, FaUsers, FaBars } from 'react-icons/fa';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = [];
        querySnapshot.forEach(doc => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="users-page" onClick={handleCloseSidebar}>
     
      <SlideBar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <div className="users-container">
        <h2>
          <FaUsers className="header-icon" /> Users List
        </h2>
        <div className="users-table">
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map(user => (
              <div key={user.id} className="user-row">
                <div className="user-info">
                  <FaUser className="user-icon" />
                  <div className="user-name">{user.name}</div>
                </div>
                <div className="user-info">
                  <FaEnvelope className="user-icon" />
                  <div className="user-email">{user.email}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;