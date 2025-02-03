import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Comments.css";
import { FaStar, FaUser, FaComment } from "react-icons/fa";
import SideBar from "../sidebar/SideBar";

const App = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const businessCollection = collection(db, "BusinessList");
        const businessSnapshot = await getDocs(businessCollection);

        const allComments = [];
        businessSnapshot.docs.forEach((doc) => {
          const businessData = doc.data();
          if (Array.isArray(businessData.comments)) {
            businessData.comments.forEach((comment) => {
              allComments.push({
                ...comment,
                businessName: businessData.name,
                businessImage: businessData.image,
              });
            });
          }
        });

        allComments.sort((a, b) => b.timestamp - a.timestamp);

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
      <h1 className="comments-title">
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