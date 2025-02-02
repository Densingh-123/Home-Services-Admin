import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import Firebase configuration
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'; // Firestore functions
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'; // Icons for actions
import './BusinessList.css'; // Custom CSS for styling
import SideBar from '../sidebar/SideBar';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]); // State to store business data
  const [editingId, setEditingId] = useState(null); // Track which business is being edited
  const [editedData, setEditedData] = useState({}); // Store edited data

  // Fetch all businesses from Firestore
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'BusinessList'));
        const businessesList = [];
        querySnapshot.forEach((doc) => {
          businessesList.push({ id: doc.id, ...doc.data() });
        });
        setBusinesses(businessesList);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);

  // Handle edit button click
  const handleEdit = (id, data) => {
    setEditingId(id);
    setEditedData(data);
  };

  // Handle input change for editing
  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  // Save edited data to Firestore
  const handleSave = async (id) => {
    try {
      const docRef = doc(db, 'BusinessList', id);
      await updateDoc(docRef, editedData);
      setEditingId(null);
      setBusinesses(
        businesses.map((business) =>
          business.id === id ? { ...business, ...editedData } : business
        )
      );
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  // Delete a business from Firestore
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'BusinessList', id));
      setBusinesses(businesses.filter((business) => business.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="business-list-page" style={{position:'relative',left:120}}>
    <SideBar/>
      <h1>Business List</h1>
      <div className="business-list-container">
        {businesses.length === 0 ? (
          <p>No businesses found</p>
        ) : (
          businesses.map((business) => (
            <div key={business.id} className="business-card">
              {editingId === business.id ? (
                // Edit Mode
                <div className="edit-mode">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={editedData.name || ''}
                      onChange={(e) => handleInputChange(e, 'name')}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={editedData.address || ''}
                      onChange={(e) => handleInputChange(e, 'address')}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={editedData.category || ''}
                      onChange={(e) => handleInputChange(e, 'category')}
                    />
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="text"
                      value={editedData.website || ''}
                      onChange={(e) => handleInputChange(e, 'website')}
                    />
                  </div>
                  <div className="form-group">
                    <label>About</label>
                    <textarea
                      value={editedData.about || ''}
                      onChange={(e) => handleInputChange(e, 'about')}
                    />
                  </div>
                  <div className="actions">
                    <button onClick={() => handleSave(business.id)}>
                      <FaSave /> Save
                    </button>
                    <button onClick={() => setEditingId(null)}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <>
                  <div className="business-image">
                    <img src={business.image} alt={business.name} />
                  </div>
                  <div className="business-details">
                    <h2>{business.name}</h2>
                    <p>
                      <strong>Address:</strong> {business.address}
                    </p>
                    <p>
                      <strong>Category:</strong> {business.category}
                    </p>
                    <p>
                      <strong>Website:</strong>{' '}
                      <a href={business.website} target="_blank" rel="noopener noreferrer">
                        {business.website}
                      </a>
                    </p>
                    <p>
                      <strong>About:</strong> {business.about}
                    </p>
                    {/* <div className="comments-section">
                      <h4>Comments:</h4>
                      {business.comments?.map((comment, index) => (
                        <div key={index} className="comment">
                          <p>{comment.comment}</p>
                          <small>Rating: {comment.rating}</small>
                        </div>
                      ))}
                    </div> */}
                  </div>
                  <div className="actions">
                    <button onClick={() => handleEdit(business.id, business)}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(business.id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BusinessList;