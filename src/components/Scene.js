// src/components/Scene.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page redirection
import OrbitingNodes from './OrbitingNodes'; // Import the OrbitingNodes class
import Model from './Model'; // Import the Model class

const Scene = () => {
  const mountRef = useRef(null);
  const model = new Model(); // Create an instance of the Model class
  const navigate = useNavigate(); // Hook to navigate between routes

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

    // Callback for handling click
    const handleNodeClick = (nodeId) => {
      console.log(`Clicked node: ${nodeId}`);
      navigate(`/${nodeId}`);
    };

    // Initialize the OrbitingNodes class and add nodes to the scene
    const orbitingNodes = new OrbitingNodes();
    orbitingNodes.createNodes(scene);
    orbitingNodes.enableMouseEvents(renderer, camera, handleNodeClick);

    // Load the 3D model and add it to the scene
    model.loadModel(scene, () => {
      console.log('Model loaded and added to scene');
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update orbiting nodes
      orbitingNodes.updateNodes();
      
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

      // Clean up orbiting nodes and mouse events
      orbitingNodes.cleanupMouseEvents();
      orbitingNodes.cleanup(scene);
      
      // Clean up Three.js scene objects
      scene.traverse((object) => {
        if (object.isMesh) {
          // Dispose of geometry
          if (object.geometry) object.geometry.dispose();

          // Dispose of materials and associated textures
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => {
              if (material.map) material.map.dispose(); // Dispose of texture map
              material.dispose(); // Dispose of material
            });
          } else {
            if (object.material.map) object.material.map.dispose(); // Dispose of texture map
            object.material.dispose(); // Dispose of material
          }
        }
      });

      // Dispose of the renderer
      renderer.dispose();

      // Remove the renderer DOM element
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  });

  return <div ref={mountRef}></div>;
};

export default Scene;
