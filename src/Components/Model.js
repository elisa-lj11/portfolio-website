// src/components/Model.js
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib'; // GLTFLoader for loading the .gltf/.glb files

const MODEL_NAME = '/models/lynx_galaxy_animated.glb';

class Model {
  constructor() {
    this.model = null;
    this.mixer = null;
    this.clock = new THREE.Clock(); // Clock to update animations
  }

  // Load the model with animations
  loadModel(scene, onLoadCallback) {
    const loader = new GLTFLoader();
    loader.load(MODEL_NAME, (gltf) => {
      this.model = gltf.scene;
      scene.add(this.model); // Add the model to the provided scene

      const animations = gltf.animations;
      if (animations && animations.length > 0) {
        // Set up the AnimationMixer
        this.mixer = new THREE.AnimationMixer(this.model);
        const action = this.mixer.clipAction(animations[0]);
        action.play();
      } else {
        console.log('No animations found in this model');
      }

      // Invoke the callback once the model is loaded
      if (onLoadCallback) onLoadCallback();
    });
  }

  // Update the animation mixer based on the clock delta time
  updateAnimations() {
    if (this.mixer) {
      const delta = this.clock.getDelta();
      this.mixer.update(delta);
    }
  }

  // Return the model object
  getModel() {
    return this.model;
  }
}

export default Model;
