// src/components/PageTemplate.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/PageTemplate.css'; // Import the CSS file

import galaxyImageUrl from '../assets/images/galaxy.png';

const PageTemplate = ({ title, refs, setRefs, children, generateRefsFromDOM }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [selectedSection, setSelectedSection] = useState(''); // To keep track of the selected section
  const [jumpScroll, setJumpScroll] = useState(false); // Track if a scroll is manual

  const goHome = () => {
    navigate('/'); // Navigate to the home page
  };

  // Function to search DOM for div elements and generate refs array
  const generateRefsFromDOMInternal = () => {
    const divs = document.querySelectorAll('div.section'); // Select all div section elements
    const newRefs = Array.from(divs).map((div) => {
      const h2 = div.querySelector('h2');
      return {
        id: div.id,
        label: h2 ? h2.textContent : div.id // Use h2 text if available, otherwise use the div id
      };
    });
    setRefs(newRefs); // Update refs
  };

  useEffect(() => {
    if (generateRefsFromDOM) {
      generateRefsFromDOM(generateRefsFromDOMInternal); // Call internal function
    }
    // Empty dependency array ensures this effect runs only on mount
  }, []);

  const handleScroll = (event) => {
    const targetId = event.target.value; // Get the selected value from the dropdown
    if (targetId) {
      const targetElement = document.getElementById(targetId); // Get the element to scroll to
  
      if (targetElement) {
        setJumpScroll(true); // Set flag before scroll starts
  
        // Scroll and update hash without delay
        targetElement.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `#${targetId}`);
        setSelectedSection(targetId);
  
        // Reset manual scroll flag after a delay
        setTimeout(() => setJumpScroll(false), 800);
      }
    }
  };

  // Use IntersectionObserver to track section visibility
  useEffect(() => {
    const observerOptions = {
      root: null, // Observe within the viewport
      rootMargin: '0px 0px -10% 0px', // Start detecting sections when they are entering the viewport
      threshold: [0.1], // Trigger when 10% of the section is visible
    };

    const observerCallback = (entries) => {
      const visibleSections = entries.filter((entry) => entry.isIntersecting);
      if (visibleSections.length > 0) {
        // If at least one section is visible, set the selected section
        const visibleSection = visibleSections[0].target.id;
        setSelectedSection(visibleSection);
        window.history.replaceState(null, '', `#${visibleSection}`); // Update the URL hash
      }
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
        if (section) {
          observer.unobserve(section);
        }
      });

      // Clean up the observer on component unmount
      observer.disconnect();
    };
  }, [refs, jumpScroll]);

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
