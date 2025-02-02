import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import your Firebase configuration
import { collection, getDocs } from "firebase/firestore";
import "./Comments.css"; // Import your CSS file for styling
import { FaStar, FaUser, FaComment } from "react-icons/fa"; // Import icons from react-icons
import SideBar from "../sidebar/SideBar";

const App = () => {
  const [comments, setComments] = useState([]); // State to store all comments
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all businesses
        const businessCollection = collection(db, "BusinessList");
        const businessSnapshot = await getDocs(businessCollection);

        // Extract all comments from all businesses
        const allComments = [];
        businessSnapshot.docs.forEach((doc) => {
          const businessData = doc.data();
          if (Array.isArray(businessData.comments)) {
            businessData.comments.forEach((comment) => {
              allComments.push({
                ...comment,
                businessName: businessData.name, // Add business name to the comment
                businessImage: businessData.image, // Add business image to the comment
              });
            });
          }
        });

        // Sort comments by timestamp (or any other field) to show new comments at the top
        allComments.sort((a, b) => b.timestamp - a.timestamp); // Assuming each comment has a `timestamp` field

        setComments(allComments);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="comments-container">
      <SideBar />
      <h1 className="comments-title" style={{position:'relative',left:30}}>
        <FaComment /> All Comments
      </h1>
      {comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment-box">
              <div className="comment-header">
                {comment.image && (
                  <img
                    src={comment.image}
                    alt={comment.userId}
                    className="comment-user-image"
                  />
                )}
                <div className="comment-user-details">
                  <p className="comment-user-name">
                    <FaUser /> {comment.userId}
                  </p>
                  <p className="comment-rating">
                    <FaStar /> {comment.rating}
                  </p>
                </div>
              </div>
              <p className="comment-text">{comment.comment}</p>
              {/* Display business name and image (optional) */}
              <div className="comment-business-info">
                {comment.businessImage && (
                  <img
                    src={comment.businessImage}
                    alt={comment.businessName}
                    className="business-image"
                  />
                )}
                <p className="business-name">{comment.businessName}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-comments-message">No comments available.</p>
      )}
    </div>
  );
};

export default App;