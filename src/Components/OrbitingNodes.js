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

  // Function to create orbiting nodes
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
        if (this.clickCallback) {
          this.clickCallback(intersectedNode); // Handle click event
        }
      }
    } else {
      this.INTERSECTED = null;
    }
  }

  // Set up mouse event listeners for detecting clicks
  enableMouseEvents(renderer, camera, clickCallback) {
    this.clickCallback = clickCallback;
    renderer.domElement.addEventListener('click', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }
}

export default OrbitingNodes;
