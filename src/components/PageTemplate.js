// src/components/PageTemplate.js
import React from 'react';
import '../assets/style/PageTemplate.css'; // Import the CSS file

const PageTemplate = ({ title, children }) => {
  return (
    <div className="page-template">
      <header>
        <h1>{title}</h1>
        {/* Add other common header elements here */}
      </header>
      <main>
        {children} {/* This is where the specific page content will be rendered */}
      </main>
      <footer>
        {/* Add footer elements here if needed */}
      </footer>
    </div>
  );
};

export default PageTemplate;
