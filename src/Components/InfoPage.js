// src/components/InfoPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const InfoPage = () => {
  const { starIndex } = useParams(); // Get the star index from the route params

  // Example data for each star (this could come from a database later)
  const starData = [
    {
      title: "Star 1",
      content: "This is the description for Star 1.",
      photo: "/images/star1.jpg",
      links: [
        { href: "https://example.com/star1", text: "Learn more about Star 1" },
      ],
    },
    {
      title: "Star 2",
      content: "This is the description for Star 2.",
      photo: "/images/star2.jpg",
      links: [
        { href: "https://example.com/star2", text: "Learn more about Star 2" },
      ],
    },
    // Add more star data...
  ];

  // Get the data for the current star based on the starIndex
  const star = starData[starIndex] || {
    title: "Unknown Star",
    content: "This star does not have any information yet.",
  };

  return (
    <div>
      <h1>{star.title}</h1>
      <p>{star.content}</p>
      {star.photo && <img src={star.photo} alt={star.title} />}
      <ul>
        {star.links &&
          star.links.map((link, index) => (
            <li key={index}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.text}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default InfoPage;
