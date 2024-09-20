// src/components/OrbitingNodes.js
import * as THREE from 'three';

class OrbitingNodes {
  constructor() {
    this.nodes = [];
    this.startRadius = 0.0;
    this.finalRadius = 3.2;
    this.numNodes = 5;
    this.orbitRadius = this.startRadius; // Orbit radius starts from 0 and expands
    this.rotationSpeed = 0.5; // Speed of swirling motion
    this.baseRotationSpeed = 0.5; // Default rotation speed
    this.slowRotationSpeed = 0.05; // Slower speed when hovering
    this.targetRotationSpeed = this.baseRotationSpeed; // Add a target for smooth lerping
    this.lerpSpeed = 0.02; // Adjusted to make lerping smoother
    this.rotationStartDelay = 0.2; // How long to wait before starting the animation

    this.hoverTimeout = null; // Timer for delay
    this.hovered = false; // Track if the mouse is hovering
    this.hoverDelay = 200; // Time in milliseconds before switching speeds

    this.clock = new THREE.Clock();
    this.angles = []; // Store the current angle for each node

    this.heightMultiplier = -2; // Controls how much the nodes "climb" the cone vertically
    this.startHeight = 2; // Starting below the galaxy center (negative y value)

    // Raycaster for interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Interaction states
    this.INTERSECTED = null;
    this.isClicking = false;
    this.isDragging = false;
    this.clickCallback = null;

    // Initialize the starting angles for the nodes
    for (let i = 0; i < this.numNodes; i++) {
      this.angles.push((i / this.numNodes) * 2 * Math.PI);
    }
  }

  // Function to create orbiting nodes with unique IDs
  createNodes(scene) {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < this.numNodes; i++) {
      const node = new THREE.Mesh(geometry, material);

      node.position.set(
        this.startRadius * Math.cos((i / this.numNodes) * 2 * Math.PI),
        this.startHeight,
        this.startRadius * Math.sin((i / this.numNodes) * 2 * Math.PI)
      );

      node.userData = { id: `node${i + 1}` }; // Assign a unique ID to each node
      this.nodes.push(node);

      scene.add(node);

      // Store an initial angle offset for each node
      this.angles.push((i / this.numNodes) * 2 * Math.PI);
    }
  }

  // Set up mouse event listeners for detecting clicks
  enableMouseEvents(renderer, camera, clickCallback) {
    this.clickCallback = clickCallback;

    // Listen for mousedown and mouseup to track clicks
    const onMouseDown = (event) => {
      this.isClicking = true; // Set flag to true when mouse is pressed
    };

    const onMouseMove = (event) => {
      // Set isDragging to true when mouse moves during a click
      if (this.isClicking) {
        this.isDragging = true;
      }

      // Only listen to intersections when mouse is moving
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
  
  // Handle orbiting logic on animation frame updates
  updateNodes(camera) {
    const deltaTime = this.clock.getDelta(); // Use deltaTime for incremental updates
    const elapsedTime = this.clock.getElapsedTime() - this.rotationStartDelay; // Use elapsedTime for approach to final radius

    // Set raycaster from camera perspective
    this.raycaster.setFromCamera(this.mouse, camera);
    const intersects = this.raycaster.intersectObjects(this.nodes);

    // Lerp rotation speed based on mouse hover
    if (intersects.length > 0) {
      // Mouse is hovering over a node, delay the speed change
      if (!this.hovered) {
        this.hovered = true;
        clearTimeout(this.hoverTimeout); // Clear any pending timeout
        this.hoverTimeout = setTimeout(() => {
          this.targetRotationSpeed = this.slowRotationSpeed; // Target the slow speed after delay
        }, this.hoverDelay);
      }
    } else {
      // Mouse is not hovering, delay switching back to base speed
      if (this.hovered) {
        this.hovered = false;
        clearTimeout(this.hoverTimeout); // Clear any pending timeout
        this.hoverTimeout = setTimeout(() => {
          this.targetRotationSpeed = this.baseRotationSpeed; // Target the base speed after delay
        }, this.hoverDelay);
      }
    }

    // Smoothly lerp the rotation speed toward the target speed every frame
    this.rotationSpeed = THREE.MathUtils.lerp(this.rotationSpeed, this.targetRotationSpeed, this.lerpSpeed);

    // Update orbitRadius based on time, for outward movement
    this.orbitRadius =
      this.startRadius +
      (this.finalRadius - this.startRadius) *
        (2 / (1 + 2 ** (-3 * Math.max(0, elapsedTime - this.rotationStartDelay))) - 1); // Sigmoid-like smooth expansion

    // Swirl nodes around and update positions along the upside-down cone, starting from below
    this.nodes.forEach((node, i) => {
      // Increment the angle based on the current rotation speed and deltaTime
      this.angles[i] += this.rotationSpeed * deltaTime;

      // Make sure the angle wraps around between 0 and 2*PI (360 degrees)
      this.angles[i] = this.angles[i] % (2 * Math.PI);

      // Cone motion: x and z expand outward, y starts below the center and rises
      node.position.x = this.orbitRadius * Math.cos(this.angles[i]);
      node.position.z = this.orbitRadius * Math.sin(this.angles[i]);

      // Calculate the y-position for upward movement, simulating an upside-down cone
      const normalizedRadius = this.orbitRadius / this.finalRadius; // 0 at start, 1 at max
      node.position.y = this.startHeight + normalizedRadius * this.heightMultiplier; // Rising upward
    });
  }
}

export default OrbitingNodes;
