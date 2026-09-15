// src/components/GLTFModel.js
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib'; // GLTFLoader for loading the .gltf/.glb files

class GLTFModel {
  constructor(modelName, scale) {
    this.modelName = modelName;
    this.model = null;
    this.scale = scale;
    this.mixer = null;
    this.speed = 1; // Speed constant for the orbiting motion
    this.timer = new THREE.Timer(); // Timer to update animations
    this.timerStarted = false; // Timer is reset on the first frame so the first delta is ~0
  }

  // Load the model with animations
  loadModel(scene, rotation, onLoadCallback) {
    const loader = new GLTFLoader();
    loader.load(this.modelName, (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(this.scale, this.scale, this.scale);
      this.model.rotation.copy(rotation);
      scene.add(this.model); // Add the model to the provided scene

      const animations = gltf.animations;
      if (animations && animations.length > 0) {
        // Set up the AnimationMixer
        this.mixer = new THREE.AnimationMixer(this.model);
        const action = this.mixer.clipAction(animations[0]);
        action.play();
      } else {
        if (process.env.IS_DEVELOPMENT) console.log('No animations found in this model: ' + this.modelName);
      }

      // Invoke the callback once the model is loaded
      if (onLoadCallback) onLoadCallback();
    });
  }

  // Update the animation mixer based on the timer delta time
  updateAnimations() {
    // Unlike Clock, Timer must be advanced once per frame before reading the delta
    if (!this.timerStarted) {
      this.timer.reset(); // Avoids a huge first delta covering the time since construction
      this.timerStarted = true;
    }
    this.timer.update();

    if (this.mixer) {
      const delta = this.timer.getDelta() * this.speed;
      this.mixer.update(delta);
    }
  }

  // Update the orbit speed
  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  // Return the model object
  getModel() {
    return this.model;
  }
}

export default GLTFModel;
