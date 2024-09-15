// src/components/Galaxy.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom'; // for navigation

const Galaxy = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create galaxy of clickable stars
    const stars = [];
    const geometry = new THREE.SphereGeometry(0.05, 32, 32); // Star size
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Add multiple stars with random positions
    for (let i = 0; i < 100; i++) {
      const star = new THREE.Mesh(geometry, material);
      star.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      stars.push(star);
      scene.add(star);
    }

    // Handle clicks on stars (nodes)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update raycaster and check for intersection with stars
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(stars);
      if (intersects.length > 0) {
        const clickedStar = intersects[0].object;

        // Redirect to different pages based on which star is clicked
        const starIndex = stars.indexOf(clickedStar);
        navigate(`/page/${starIndex}`); // Redirect to unique pages for each star
      }
    };

    window.addEventListener('click', handleClick);

    // Set up animation (spinning galaxy)
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the entire galaxy (stars group)
      stars.forEach((star) => {
        star.rotation.y += 0.001; // Slow rotation
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('click', handleClick);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [navigate]);

  return <div ref={mountRef}></div>;
};

export default Galaxy;
