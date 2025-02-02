import React from 'react';
import SideBar from '../sidebar/SideBar';

const Services = () => {
  return (
    <>
      <SideBar />
      <img 
        src="https://img.freepik.com/premium-vector/man-has-repaired-old-house-rent_701961-3369.jpg" 
        alt="Fullscreen Image" 
        style={{
          width: '82vw',
          height: '90vh',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 250,
          top:40,
          zIndex: -1
        }} 
      />
    </>
  );
};

export default Services;
