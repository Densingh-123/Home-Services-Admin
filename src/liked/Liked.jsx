import React, { useEffect, useState } from 'react';
import SideBar from '../sidebar/SideBar';
import { db } from '../firebase'; // Adjust the import path as necessary
import { collection, getDocs } from 'firebase/firestore';
import './Liked.css'; // Create this CSS file for styling

const Liked = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Step 1: Fetch all products from the "Likes" collection
        const likesQuery = collection(db, 'Likes');
        const likesSnapshot = await getDocs(likesQuery);

        // Step 2: Map the required data
        const productsData = [];
        likesSnapshot.forEach((doc) => {
          const productData = doc.data();
          productsData.push({
            businessId: doc.id,
            businessImage: productData.businessImage,
            businessName: productData.businessName,
            businessLikes: productData.businessLikes,
            businessRatings: productData.businessRatings,
            users: productData.users,
          });
        });

        // Step 3: Update the state with the fetched products
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <SideBar />
      <div className="liked-container" style={{ width: 1000, position: 'relative', left: 100 }}>
        <h1>Liked Products</h1>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.businessId} className="product-card">
                <img src={product.businessImage} alt={product.businessName} className="product-image" />
                <h2 className="product-name">{product.businessName}</h2>
                <p className="product-likes">Likes: {product.businessLikes.length}</p>
                <div className="ratings">
                  {/* <h3>Ratings:</h3> */}
                  {product.businessRatings.map((rating, index) => (
                    <div key={index}>
                      {/* <p>Rating: {rating.rating}</p> */}
                      {/* <p>User: {rating.userId}</p> */}
                    </div>
                  ))}
                </div>
                <div className="users">
                <h3 style={{position:'relative',left:-90,top:20}}>Users:</h3>
                  {product.users.map((user, index) => (
                    <p key={index}>{user}</p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No liked products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Liked;