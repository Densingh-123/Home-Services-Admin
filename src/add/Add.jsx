import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './Add.css'; 

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz5KrgvMFCZPXZAhZnI6Ck_sD6F_gCZ2I",
  authDomain: "busness-5120a.firebaseapp.com",
  projectId: "busness-5120a",
  storageBucket: "busness-5120a.appspot.com",
  messagingSenderId: "453561103920",
  appId: "1:453561103920:web:e1e24a2d82cdda0da55ff5",
  measurementId: "G-K06L07H46R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AddBusiness = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [likes, setLikes] = useState(0);
  const [website, setWebsite] = useState('');
  const [contact, setContact] = useState('');
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('delivery');

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add business to Firestore
  const handleAddBusiness = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'BusinessList'), {
        image,
        name,
        likes,
        website,
        contact,
        about,
        address,
        category,
      });
      alert('Business added successfully!');
      // Reset form fields
      setImage(null);
      setName('');
      setLikes(0);
      setWebsite('');
      setContact('');
      setAbout('');
      setAddress('');
      setCategory('delivery');
    } catch (error) {
      console.error('Error adding business:', error);
      alert('Failed to add business. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Add Business</h1>
        <form onSubmit={handleAddBusiness}>
          {/* Image Upload */}
          <div className="image-container">
            <label htmlFor="image-upload" className="image-upload-label">
              {image ? (
                <img src={image} alt="Business" className="image-preview" />
              ) : (
                <div className="placeholder-image">
                  <span>Upload Image</span>
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Input Fields */}
          <input
            type="text"
            placeholder="Business Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Likes"
            value={likes}
            onChange={(e) => setLikes(Number(e.target.value))}
            required
          />
          <input
            type="url"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <textarea
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="delivery">Delivery</option>
            <option value="wash">Wash</option>
            <option value="gym">Gym</option>
            <option value="food">Food</option>
            <option value="car">Car</option>
          </select>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;