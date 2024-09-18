// src/components/OrbitingNodes.js
import * as THREE from 'three';

class OrbitingNodes {
  constructor() {
    this.nodes = [];
    this.orbitRadius = 3; // Set a radius for the orbiting nodes
    this.numNodes = 5;    // Number of orbiting nodes

    this.clock = new THREE.Clock();
    this.angle = 0;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.INTERSECTED = null;
    this.isClicking = false;
    this.isDragging = false;
    this.clickCallback = null;
  }

  // Function to create orbiting nodes with unique IDs
  createNodes(scene) {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial(
      { color: 0xffffff }
    );

    for (let i = 0; i < this.numNodes; i++) {
      const node = new THREE.Mesh(geometry, material);
      node.position.set(
        this.orbitRadius * Math.cos((i / this.numNodes) * 2 * Math.PI),
        0,
        this.orbitRadius * Math.sin((i / this.numNodes) * 2 * Math.PI)
      );
      node.userData = { id: `node${i + 1}` }; // Assign a unique ID to each node
      this.nodes.push(node);
      scene.add(node);
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
        this.clickCallback(intersectedNode, nodeId); // Call the callback with node and nodeId
      }
    }
  }
  
  // Handle orbiting logic
  updateNodes() {
    this.angle += this.clock.getDelta(); // Increment angle for orbiting motion

    this.nodes.forEach((node, i) => {
      node.position.x = this.orbitRadius * Math.cos(this.angle + (i / this.numNodes) * 2 * Math.PI);
      node.position.z = this.orbitRadius * Math.sin(this.angle + (i / this.numNodes) * 2 * Math.PI);
    });
  }

  // Add a cleanup method to properly remove nodes and dispose of geometries/materials
  cleanup(scene) {
    this.nodes.forEach((node) => {
      // Remove the node from the scene
      scene.remove(node);

      // Dispose of the geometry and material
      if (node.geometry) node.geometry.dispose();
      if (node.material) {
        if (node.material.map) node.material.map.dispose();
        node.material.dispose();
      }
    });
  }
}

export default OrbitingNodes;
