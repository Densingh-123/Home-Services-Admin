import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { auth, signInWithGoogle, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './Login.css'; // Add custom CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
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

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' ,overflow:'hidden',position:'relative',left:-155,top:-30}}>
      {/* Left Side: Three.js Animation */}
      <div style={{ flex: 1.5, background: '#1e1e2f',marginLeft:-120 }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={false} />
          <Text
            position={[0, 2, 0]}
            fontSize={1}
            color="white"
            anchorX="center"
            anchorY="middle"
            style={{with:400}}
          >
            Home Services
          </Text>
          <Text
            position={[0, 0, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Cleaning | Washing | Gym Training | Car Care
          </Text>
        </Canvas>
      </div>

      {/* Right Side: Login Form */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#2a2a40' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '40px', borderRadius: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', border: '1px solid rgba(255, 255, 255, 0.18)', width: '300px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: '20px' }}>{isSignUp ? 'Sign Up' : 'Login'}</h2>
          <form onSubmit={handleSubmit} >
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '10px', }}>
              <FaEnvelope style={{ color: '#fff', marginRight: '10px' }} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%' }}
                required
              />
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '10px' }}>
              <FaLock style={{ color: '#fff', marginRight: '10px' }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%' }}
                required
              />
            </div>
            <button type="submit" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '16px', width: '100%', marginBottom: '10px' }}>
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>
          <button onClick={handleGoogleSignIn} style={{ background: '#db4437', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '16px', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaGoogle style={{ marginRight: '10px' }} /> Sign in with Google
          </button>
          <p style={{ color: '#fff', cursor: 'pointer' }} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;