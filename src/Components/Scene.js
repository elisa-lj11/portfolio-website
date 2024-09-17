// src/components/Scene.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import Model from './Model'; // Import the refactored Model class

const Scene = () => {
  const mountRef = useRef(null);
  const model = new Model(); // Create an instance of the Model class

  useEffect(() => {
    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Set up camera position
    camera.position.set(0, 1, 5);

    // Set up lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1);
    scene.add(light);

    // Add OrbitControls for camera interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load the 3D model and add it to the scene
    model.loadModel(scene, () => {
      console.log('Model loaded and added to scene');
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update the animation mixer from the model
      model.updateAnimations();

      // Update the controls
      controls.update();

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [model]);

  return <div ref={mountRef}></div>;
};

export default Scene;
