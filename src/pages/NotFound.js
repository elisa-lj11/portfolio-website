// src/components/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const goHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for crossed the event horizon.</p>
      <button 
        onClick={goHome} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
      >
        Go back in time
      </button>
    </div>
  );
};

export default NotFound;
