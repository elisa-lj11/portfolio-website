// src/components/OrbitingNodes.js
import * as THREE from 'three';

class OrbitingNodes {
  constructor(galaxyMesh) {
    this.nodes = [];
    this.numNodes = 5;
    this.galaxyMesh = galaxyMesh; // The actual galaxy mesh geometry
    this.orbitRadius = 3.2; // Orbit radius outside the mesh

    this.rotationSpeed = 0.5; // Speed of swirling motion
    this.clock = new THREE.Clock();

    // Raycaster for interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Interaction states
    this.isClicking = false;
    this.isDragging = false;
    this.clickCallback = null;

    this.galaxyVertices = []; // Array to store relevant points from the galaxy mesh
  }

  // Function to create orbiting nodes with unique IDs
  createNodes(scene) {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Extract relevant vertices from the galaxy mesh
    this.extractGalaxyVertices();

    for (let i = 0; i < this.numNodes; i++) {
      const node = new THREE.Mesh(geometry, material);

      // Start at the center or an initial point inside the galaxy
      node.position.set(0, 0, 0);

      node.userData = { id: `node${i + 1}`, phase: 1 }; // Assign a unique ID to each node, phase 1 is to traverse the galaxy
      this.nodes.push(node);

      scene.add(node);
    }
  }

  // Extract vertices from the galaxy mesh to guide node paths
  extractGalaxyVertices() {
    const positionAttribute = this.galaxyMesh.geometry.getAttribute('position');
    
    // Loop through the positions and store them as vectors
    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
      this.galaxyVertices.push(vertex);
    }
  }
    
  // Update nodes' positions along the galaxy path
  updateNodes() {
    const elapsedTime = this.clock.getElapsedTime();

    this.nodes.forEach((node, i) => {
      // Get the phase (1: traversing galaxy, 2: orbiting outside)
      const phase = node.userData.phase;

      if (phase === 1) {
        // Phase 1: Moving along the galaxy mesh
        this.moveAlongGalaxyMesh(node, i, elapsedTime);
      } else if (phase === 2) {
        // Phase 2: Orbiting outside the galaxy
        this.orbitOutsideGalaxy(node, i, elapsedTime);
      }
    });
  }

  // Move the node along the galaxy mesh
  moveAlongGalaxyMesh(node, i, elapsedTime) {
    // Select a target vertex from the galaxy mesh
    const vertexIndex = Math.floor((elapsedTime * 10 + i) % this.galaxyVertices.length);
    const targetVertex = this.galaxyVertices[vertexIndex];

    // Move node towards the target vertex (interpolating for smooth movement)
    const lerpSpeed = 0.02;
    node.position.lerp(targetVertex, lerpSpeed);

    // Once near the edge of the galaxy, transition to orbiting phase
    if (node.position.distanceTo(targetVertex) < 0.1 && vertexIndex > this.galaxyVertices.length * 0.9) {
      node.userData.phase = 2;
    }
  }

  // Orbit the node outside the galaxy
  orbitOutsideGalaxy(node, i, elapsedTime) {
    // Orbit at a fixed radius and height (adjust position based on time)
    const angle = elapsedTime * this.rotationSpeed + (i / this.numNodes) * Math.PI * 2;
    node.position.x = this.orbitRadius * Math.cos(angle);
    node.position.z = this.orbitRadius * Math.sin(angle);
    node.position.y = this.galaxyMesh.position.y; // Stay at the galaxy's height
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
}

export default OrbitingNodes;
