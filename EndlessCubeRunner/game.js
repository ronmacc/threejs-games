import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { setupController } from './Controller.js';

// Game state
let isGameRunning = true;

// Define keys object
const keys = { a: false, d: false, w: false, s: false };

// Scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 1, 25);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Restore OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Collision Box Class
class Box extends THREE.Mesh {
    constructor({ width, height, depth, color, velocity = { x: 0, y: 0, z: 0 }, position = { x: 0, y: 0, z: 0 }, zAcceleration = false }) {
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshPhysicalMaterial({
                color,
                roughness: 0.7,
                metalness: 0,
                clearcoat: 0.3,
                clearcoatRoughness: 0.5
            })
        );

        this.width = width;
        this.height = height;
        this.depth = depth;

        this.position.set(position.x, position.y, position.z);
        this.velocity = velocity;
        this.gravity = -0.01; // Slower gravity for smoother jumps
        this.zAcceleration = zAcceleration;
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
            this.velocity.y *= -0.8; // Reverse direction (bounce)
            this.position.y = ground.position.y + ground.height / 2 + this.height / 2;
        }
    }
}

// Collision detection
function boxCollision({ box1, box2 }) {
    const xCollision = box1.position.x + box1.width / 2 >= box2.position.x - box2.width / 2 &&
        box1.position.x - box1.width / 2 <= box2.position.x + box2.width / 2;

    const yCollision = box1.position.y - box1.height / 2 <= box2.position.y + box2.height / 2 &&
        box1.position.y + box1.height / 2 >= box2.position.y - box2.height / 2;

    const zCollision = box1.position.z + box1.depth / 2 >= box2.position.z - box2.depth / 2 &&
        box1.position.z - box1.depth / 2 <= box2.position.z + box2.depth / 2;

    return xCollision && yCollision && zCollision;
}

// Player setup
const player = new Box({
    width: 1,
    height: 1,
    depth: 1,
    color: '#ff0000',
    velocity: { x: 0, y: -0.05, z: 0 }
});
player.castShadow = true;
scene.add(player);

// Ground setup
const ground = new Box({
    width: 5,
    height: 0.5,
    depth: 50,
    color: '#ffffff',
    position: { x: 0, y: -2, z: 0 }
});
ground.receiveShadow = true;
scene.add(ground);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 0.4);
light.position.set(10, 20, 20);
light.castShadow = true;
scene.add(light);

// Enemy setup
const enemies = [];
let frames = 0;
let spawnRate = 90; // Slower spawn rate

// Set up input handlers
setupController(keys, isGameRunning, player);

// Button logic
document.getElementById('play-again-btn').addEventListener('click', () => {
    console.log('Restarting game...');

    // Reset game state
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

    const deltaTime = (time - lastTime) / 16; // Scale movement for consistent speed
    lastTime = time;

    // Player movement
    player.velocity.x = keys.a ? -0.05 : keys.d ? 0.05 : 0;
    player.velocity.z = keys.w ? -0.05 : keys.s ? 0.05 : 0;

    player.update(ground, deltaTime);

    // Update enemies
    enemies.forEach((enemy) => {
        enemy.update(ground, deltaTime);

        // Check collision with player
        if (boxCollision({ box1: player, box2: enemy })) {
            console.log('Collision detected! Game Over.');
            isGameRunning = false;
            document.getElementById('play-again-btn').style.display = 'block';
        }
    });

    if (frames++ % spawnRate === 0) {
        const enemy = new Box({
            width: 1,
            height: 1,
            depth: 1,
            position: { x: (Math.random() - 0.5) * 5, y: 0, z: -20 },
            velocity: { x: 0, y: 0, z: 0.0025 },
            zAcceleration: true,
            color: '#00ff00'
        });
        enemy.castShadow = true;
        scene.add(enemy);
        enemies.push(enemy);
    }

    controls.update(); // Ensure OrbitControls are updated

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// Start animation loop
animate(0);
