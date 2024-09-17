// src/components/OrbitingNodes.js
import * as THREE from 'three';

class OrbitingNodes {
  constructor() {
    this.nodes = [];
    this.orbitRadius = 3; // Set a radius for the orbiting nodes
    this.numNodes = 5;    // Number of orbiting nodes
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.INTERSECTED = null;
    this.clock = new THREE.Clock();
    this.angle = 0;
    this.clickCallback = null;
  }

  // Function to create orbiting nodes with unique IDs
  createNodes(scene) {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

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

  // Handle orbiting logic
  updateNodes(scene, camera) {
    this.angle += this.clock.getDelta(); // Increment angle for orbiting motion

    this.nodes.forEach((node, i) => {
      node.position.x = this.orbitRadius * Math.cos(this.angle + (i / this.numNodes) * 2 * Math.PI);
      node.position.z = this.orbitRadius * Math.sin(this.angle + (i / this.numNodes) * 2 * Math.PI);
    });

    // Detect intersections with mouse clicks
    this.raycaster.setFromCamera(this.mouse, camera);
    const intersects = this.raycaster.intersectObjects(this.nodes);

    if (intersects.length > 0) {
      const intersectedNode = intersects[0].object;
      if (this.INTERSECTED !== intersectedNode) {
        this.INTERSECTED = intersectedNode;

         // Trigger click callback only once per click
        if (this.isClicking && this.clickCallback) {
          const nodeId = intersectedNode.userData.id;
          this.clickCallback(intersectedNode, nodeId); // Pass the node ID to the click callback
          this.isClicking = false; // Reset the flag after handling the click
        }
      }
    } else {
      this.INTERSECTED = null;
    }
  }

  // Set up mouse event listeners for detecting clicks
  enableMouseEvents(renderer, camera, clickCallback) {
    this.clickCallback = clickCallback;

    // Listen for mousedown and mouseup to track clicks
    renderer.domElement.addEventListener('mousedown', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.isClicking = true; // Set flag to true when mouse is pressed
    });

    renderer.domElement.addEventListener('mouseup', () => {
      this.isClicking = false; // Reset flag when mouse button is released
    });
  }
}

export default OrbitingNodes;
