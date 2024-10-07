// src/components/PageTemplate.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/PageTemplate.css'; // Import the CSS file

import galaxyImageUrl from '../assets/images/galaxy.png';

const PageTemplate = ({ title, refs, children }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const goHome = () => {
    navigate('/'); // Navigate to the home page
  };

  const handleScroll = (event) => {
    const targetId = event.target.value; // Get the selected value from the dropdown
    if (targetId) {
      const targetElement = document.getElementById(targetId); // Get the element to scroll to
  
      // Scroll to the target element smoothly
      targetElement.scrollIntoView({ behavior: 'smooth' });
  
      // Update the URL hash after a short delay to ensure the scroll is finished
      setTimeout(() => {
        window.location.hash = targetId;
      }, 800); // Delay time matches scroll time
    }
  };

  return (
    <div className="page-template">
      <header>
        <button className="home" onClick={goHome}>
          &lt;
          <img src={galaxyImageUrl} width="40px"/>
          Go back to space
        </button>
        {/* FIXME: Dropdown box is not centered */}
        <div className="dropdown">
          <select onChange={handleScroll} defaultValue="">
            <option value="" disabled>Warp to a section</option>
            {refs.map((ref) => (
              <option key={ref.id} value={ref.id}>
                {ref.label}
              </option>
            ))}
          </select>
        </div>
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
