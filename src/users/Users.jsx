import React, { useEffect, useState } from 'react';
import SlideBar from '../sidebar/SideBar';
import { db } from '../firebase'; // Import Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { FaUser, FaEnvelope, FaUsers } from 'react-icons/fa'; // Import icons
import './Users.css'; // Importing custom CSS for styling

const Users = () => {
  const [users, setUsers] = useState([]); // State to store users data

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = [];
        querySnapshot.forEach(doc => {
          usersList.push({ id: doc.id, ...doc.data() }); // Push user data to array
        });
        setUsers(usersList); // Set state with users data
      } catch (error) {
        console.error('Error fetching users:', error); // Log any errors
      }
    };

    fetchUsers(); // Fetch users when component mounts
  }, []);

  return (
    <div className="users-page">
      <SlideBar />
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