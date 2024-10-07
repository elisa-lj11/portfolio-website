// src/components/PageTemplate.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/PageTemplate.css'; // Import the CSS file

import galaxyImageUrl from '../assets/images/galaxy.png';

const PageTemplate = ({ title, refs, children }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [selectedSection, setSelectedSection] = useState(''); // To keep track of the selected section

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
        setSelectedSection(targetId);
      }, 800); // Delay time matches scroll time
    }
  };

  // Use IntersectionObserver to track section visibility
  useEffect(() => {
    const observerOptions = {
      root: null, // Observe within the viewport
      threshold: 0.5, // Trigger when at least 50% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleSectionId = entry.target.id;
          setSelectedSection(visibleSectionId); // Update the dropdown to the visible section
          window.history.replaceState(null, '', `#${visibleSectionId}`); // Update the URL hash without jumping
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section (the refs should correspond to section headers)
    refs.forEach((ref) => {
      const section = document.getElementById(ref.id);
      if (section) observer.observe(section);
    });

    // Clean up the observer when the component unmounts
    return () => {
      refs.forEach((ref) => {
        const section = document.getElementById(ref.id);
        if (section) observer.unobserve(section);
      });
    };
  }, [refs]);

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
          <select onChange={handleScroll} value={selectedSection || ""}>
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
