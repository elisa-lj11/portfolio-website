// src/pages/NodeThree.js
import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';

const NodeThree = () => {
  const [refs, setRefs] = useState([]);

  // Function to be used in PageTemplate and passed down
  const generateRefsFromDOM = (generateRefsFunction) => {
    generateRefsFunction();  // Call the function that scans the DOM and sets the refs
  };

  return (
    <PageTemplate
      title="Node Three" 
      refs={refs} 
      setRefs={setRefs} 
      generateRefsFromDOM={generateRefsFromDOM}
    >
      <p>This is the content for Node Three.</p>
      {/* Add more specific content here */}
    </PageTemplate>
  );
};

export default NodeThree;