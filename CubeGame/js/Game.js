import * as THREE from 'three';
import { Box } from './Box.js';
import { Controls } from './Controls.js';

export class Game {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xffffff, 1, 25);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 8);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);

    this.controls = null;
    this.player = null;
    this.ground = null;
    this.enemies = [];
    this.frames = 0;
    this.spawnRate = 30;
    this.isGameRunning = true;

    this.setup();
    this.animate = this.animate.bind(this);
  }

  setup() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(10, 20, 20);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    this.player = new Box({ width: 1, height: 1, depth: 1, velocity: { x: 0, y: -0.1, z: 0 } });
    this.player.castShadow = true;
    this.scene.add(this.player);

    this.ground = new Box({ width: 5, height: 0.5, depth: 50, color: '#ffffff', position: { x: 0, y: -2, z: 0 } });
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    this.controls = new Controls(this.player);
  }

  animate() {
    if (!this.isGameRunning) return;

    this.controls.update();
    this.player.update(this.ground);

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }

  start() {
    this.animate();
  }
}
