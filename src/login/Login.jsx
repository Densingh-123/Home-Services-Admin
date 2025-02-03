import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaBars } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created:', userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
      }
      navigate('/home');
    } catch (error) {
      console.error('Authentication failed:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('Google sign-in successful:', user);
      navigate('/home');
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  const handleOutsideClick = (e) => {
    if (isSidebarOpen && !e.target.closest('.sidebar')) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isSidebarOpen]);

  return (
    <div className="login-page" style={{ backgroundImage: "url('/background.jpg')" }}>
      <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FaBars />
      </button>

      {isSidebarOpen && (
        <div className="sidebar">
          <ul>
            <li onClick={() => setIsSidebarOpen(false)}>Home</li>
            <li onClick={() => setIsSidebarOpen(false)}>About</li>
            <li onClick={() => setIsSidebarOpen(false)}>Services</li>
            <li onClick={() => setIsSidebarOpen(false)}>Contact</li>
          </ul>
        </div>
      )}

      <div className="login-content">
        <div className="form-container">
          <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-container">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <button onClick={handleGoogleSignIn} className="google-btn">
            <FaGoogle /> Sign in with Google
          </button>

          <p className="toggle-text" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;