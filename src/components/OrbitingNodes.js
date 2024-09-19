// src/components/OrbitingNodes.js
import * as THREE from 'three';

class OrbitingNodes {
  constructor() {
    this.nodes = [];
    this.startRadius = 0.0;
    this.finalRadius = 3;
    this.numNodes = 5;
    this.orbitRadius = this.startRadius; // Orbit radius starts from 0 and expands
    this.rotationSpeed = 0.5; // Speed of swirling motion
    this.clock = new THREE.Clock();
    this.angleOffset = []; // Store initial angle offsets for each node

    // Raycaster for interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Interaction states
    this.INTERSECTED = null;
    this.isClicking = false;
    this.isDragging = false;
    this.clickCallback = null;
  }

  // Function to create orbiting nodes with unique IDs
  createNodes(scene) {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < this.numNodes; i++) {
      const node = new THREE.Mesh(geometry, material);
      node.position.set(
        this.startRadius * Math.cos((i / this.numNodes) * 2 * Math.PI),
        0,
        this.startRadius * Math.sin((i / this.numNodes) * 2 * Math.PI)
      );
      node.userData = { id: `node${i + 1}` }; // Assign a unique ID to each node
      this.nodes.push(node);
      scene.add(node);

      // Store an initial angle offset for each node
      this.angleOffset.push((i / this.numNodes) * 2 * Math.PI);
    }
  }

  // Set up mouse event listeners for detecting clicks
  enableMouseEvents(renderer, camera, clickCallback) {
    this.clickCallback = clickCallback;

    // Listen for mousedown and mouseup to track clicks
    const onMouseDown = (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.isClicking = true; // Set flag to true when mouse is pressed
    };

    const onMouseMove = (event) => {
      // Set isDragging to true when mouse moves during a click
      if (this.isClicking) {
        this.isDragging = true;
      }
    };

    const onMouseUp = () => {
      if (this.isClicking && !this.isDragging) {
        this.handleClick(camera);
      }
      this.isClicking = false;
      this.isDragging = false;
    };

    // Attach events
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);

    // Add a cleanup method to remove these listeners
    this.cleanupMouseEvents = () => {
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
    };
  }

  // Call the click callback when the click is valid
  handleClick(camera) {
    this.raycaster.setFromCamera(this.mouse, camera);

    // Find intersected objects
    const intersects = this.raycaster.intersectObjects(this.nodes);

    if (intersects.length > 0) {
      const intersectedNode = intersects[0].object; // Get the first intersected node
      const nodeId = intersectedNode.userData.id; // Get the ID from userData
      
      if (this.clickCallback) {
        this.clickCallback(nodeId); // Call the callback with node and nodeId
      }
    }
  }
  
  // Handle orbiting logic
  updateNodes() {
    const deltaTime = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Update orbitRadius based on time, for outward movement
    this.orbitRadius =
      this.startRadius +
      (this.finalRadius - this.startRadius) *
        (2 / (1 + 2 ** (-3 * elapsedTime)) - 1); // Sigmoid-like smooth expansion

    // Swirl nodes around and update positions
    this.nodes.forEach((node, i) => {
      const angle = this.angleOffset[i] + this.rotationSpeed * elapsedTime; // Swirling over time

      // Set the new position for each node
      node.position.x = this.orbitRadius * Math.cos(angle);
      node.position.z = this.orbitRadius * Math.sin(angle);
    });
  }

  // Update the orbit speed
  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }
}

export default OrbitingNodes;
