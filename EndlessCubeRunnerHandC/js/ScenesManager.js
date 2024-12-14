import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class SceneManager {
  constructor() {
    // Game state
    this.isGameRunning = true;

    // Define keys object
    this.keys = { a: false, d: false, w: false, s: false };

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xffffff, 1, 25); // Add fog back

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 8);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      alpha: true, // Ensure alpha is set for transparency
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true; // Enable shadows
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Restore OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Lighting
    this.addLights();

    // Handle window resizing
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Restore ambient light
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 0.4); // Restore directional light
    light.position.set(10, 20, 20);
    light.castShadow = true;
    this.scene.add(light);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
