
import * as THREE from "three";

import { SceneManager } from './ScenesManager.js';
import { setupController } from './Controller.js';

// Initialize SceneManager
const sceneManager = new SceneManager();
const { scene, camera, renderer } = sceneManager;

// Game state
let isGameRunning = true;

// Define keys object
const keys = { a: false, d: false, w: false, s: false };

// Trigger Game Over
function triggerGameOver(message) {
  console.log(message);
  isGameRunning = false;
  document.getElementById('play-again-btn').style.display = 'block';
}

// Collision Box Class
class Box extends THREE.Mesh {
  constructor({ width, height, depth, color, velocity = { x: 0, y: 0, z: 0 }, position = { x: 0, y: 0, z: 0 }, zAcceleration = false, isPlayer = false }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.7,
        metalness: 0,
        clearcoat: 0.3,
        clearcoatRoughness: 0.5,
      })
    );

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.position.set(position.x, position.y, position.z);
    this.velocity = velocity;
    this.gravity = -0.01;
    this.zAcceleration = zAcceleration;
    this.isPlayer = isPlayer;
  }

  update(ground, deltaTime) {
    if (!isGameRunning) return;

    this.position.x += this.velocity.x * deltaTime;
    this.position.z += this.velocity.z * deltaTime;

    if (this.zAcceleration) this.velocity.z += 0.001 * deltaTime;

    this.velocity.y += this.gravity * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    // Collision with ground
    if (boxCollision({ box1: this, box2: ground })) {
      this.velocity.y *= -0.8;
      this.position.y = ground.position.y + ground.height / 2 + this.height / 2;
    }

    // Check if this is the player and if they fall below the ground
    const fallingThreshold = -5;
    if (this.isPlayer && this.position.y < fallingThreshold) {
      triggerGameOver('Player fell below ground.');
    }
  }
}

// Collision detection
function boxCollision({ box1, box2 }) {
  const xCollision = box1.position.x + box1.width / 2 >= box2.position.x - box2.width / 2 && box1.position.x - box1.width / 2 <= box2.position.x + box2.width / 2;
  const yCollision = box1.position.y - box1.height / 2 <= box2.position.y + box2.height / 2 && box1.position.y + box1.height / 2 >= box2.position.y - box2.height / 2;
  const zCollision = box1.position.z + box1.depth / 2 >= box2.position.z - box2.depth / 2 && box1.position.z - box1.depth / 2 <= box2.position.z + box2.depth / 2;

  return xCollision && yCollision && zCollision;
}

// Player setup
const player = new Box({
  width: 1,
  height: 1,
  depth: 1,
  color: '#ff0000',
  velocity: { x: 0, y: -0.05, z: 0 },
  isPlayer: true,
});
player.castShadow = true;
scene.add(player);

// Ground setup
const ground = new Box({
  width: 5,
  height: 0.5,
  depth: 50,
  color: '#ffffff',
  position: { x: 0, y: -2, z: 0 },
});
ground.receiveShadow = true;
scene.add(ground);

// Enemy setup
const enemies = [];
let frames = 0;
let spawnRate = 90;

// Set up input handlers
setupController(keys, isGameRunning, player);

// Button logic
document.getElementById('play-again-btn').addEventListener('click', () => {
  console.log('Restarting game...');
  isGameRunning = true;
  document.getElementById('play-again-btn').style.display = 'none';

  // Clear existing enemies
  enemies.forEach((enemy) => scene.remove(enemy));
  enemies.length = 0;

  // Reset player position and velocity
  player.velocity = { x: 0, y: 0, z: 0 };
  player.position.set(0, 2, 2);
  player.gravity = 0;

  setTimeout(() => {
    player.gravity = -0.01;
  }, 100);

  frames = 0;
  animate(0);
});

// Animation loop
let lastTime = 0;

function animate(time) {
  if (!isGameRunning) return;

  const deltaTime = (time - lastTime) / 16;
  lastTime = time;

  // Player movement
  player.velocity.x = keys.a ? -0.05 : keys.d ? 0.05 : 0;
  player.velocity.z = keys.w ? -0.05 : keys.s ? 0.05 : 0;

  player.update(ground, deltaTime);

  // Update enemies
  enemies.forEach((enemy) => {
    enemy.update(ground, deltaTime);
    if (boxCollision({ box1: player, box2: enemy })) {
      triggerGameOver('Collision detected! Game Over.');
    }
  });

  if (frames++ % spawnRate === 0) {
    const enemy = new Box({
      width: 1,
      height: 1,
      depth: 1,
      position: { x: (Math.random() - 0.5) * 5, y: (Math.random()), z: -20 },
      velocity: { x: 0, y: 0, z: 0.0025 },
      zAcceleration: true,
      color: '#00ff00',
    });
    enemy.castShadow = true;
    scene.add(enemy);
    enemies.push(enemy);
  }

  sceneManager.render();
  requestAnimationFrame(animate);
}

// Start animation loop
animate(0);
