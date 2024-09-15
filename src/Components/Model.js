// src/components/Model.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib'; // GLTFLoader for loading the .gltf/.glb files
import { OrbitControls } from 'three-stdlib';

const Model = () => {
  const mountRef = useRef(null);
  const MODEL_NAME = '/models/lynx_galaxy_animated.glb';

  useEffect(() => {
    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Camera position
    camera.position.set(0, 1, 5);

    // Load the model with animations
    const loader = new GLTFLoader();
    loader.load(MODEL_NAME, (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Check if animations are available
      const animations = gltf.animations; // Array of animations

      if (animations && animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model); // Animation mixer to handle animations
        const action = mixer.clipAction(animations[0]); // Play the first animation
        action.play();

        // Animate the mixer
        const clock = new THREE.Clock();

        const animate = () => {
          requestAnimationFrame(animate);
          const delta = clock.getDelta(); // Get the time difference between frames
          mixer.update(delta); // Update the animation based on delta time
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      } else {
        console.log('No animations found in this model');
      }
    });

    /*// Load the GLTF model
    const loader = new GLTFLoader();
    loader.load(MODEL_NAME, (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      model.position.set(0, 0, 0); // Set the model's position in the scene
    });*/

    // Set up lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1);
    scene.add(light);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: smooth motion

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update controls
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
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
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default Model;
