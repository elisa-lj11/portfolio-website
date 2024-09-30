// src/components/PageTemplate.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/PageTemplate.css'; // Import the CSS file

import galaxyImageUrl from '../assets/images/galaxy.png';

const PageTemplate = ({ title, children }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const goHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="page-template">
      <header>
        <button className="home" onClick={goHome}>
          &lt;
          <img src={galaxyImageUrl} width="40px"/>
          Go back to space
        </button>
        {/* Add other common header elements here */}
      </header>
      <main>
        <div className="content">
          <h1>{title}</h1>
          {children} {/* This is where the specific page content will be rendered */}
        </div>
      </main>
      <footer>
        {/* Add footer elements here if needed */}
      </footer>
    </div>
  );
};

export default PageTemplate;
