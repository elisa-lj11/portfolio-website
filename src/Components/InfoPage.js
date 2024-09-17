// src/components/InfoPage.js
import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters

const InfoPage = () => {
  const { nodeId } = useParams(); // Access the nodeId from the URL

  // Define content for each node
  const nodeContent = {
    node1: {
      title: 'Node 1',
      description: 'This is the info page for Node 1.',
    },
    node2: {
      title: 'Node 2',
      description: 'This is the info page for Node 2.',
    },
    node3: {
      title: 'Node 3',
      description: 'This is the info page for Node 3.',
    },
    node4: {
      title: 'Node 4',
      description: 'This is the info page for Node 4.',
    },
    node5: {
      title: 'Node 5',
      description: 'This is the info page for Node 5.',
    },
  };

  // Get the content for the current node based on the nodeId
  const content = nodeContent[nodeId] || {
    title: 'Unknown Node',
    description: 'No information available for this node.',
  };

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};

export default InfoPage;
