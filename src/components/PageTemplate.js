// src/components/PageTemplate.js
import React from 'react';

const PageTemplate = ({ title, children }) => {
  return (
    <div className="template-container">
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
