import * as THREE from "three";
import { SceneManager } from './ScenesManager.js';
import { setupController } from './Controller.js';
import { HandControls } from "./HandControls.js";
import { MediaPipeHands } from "./MediaPipeHands.js";
import { BaseBox } from './BaseBox.js';

export class App {
    constructor() {
        // Initialize SceneManager
        const sceneManager = new SceneManager();
        const { scene, camera, renderer } = sceneManager;

        // if (this.hasGetUserMedia()) {
        //     const enableWebcamButton = document.getElementById("play-again-btn");
        //     enableWebcamButton.addEventListener("click", (e) => {
        //       if (this.hasCamera) return;
        //       e.preventDefault();
        //       this.hasCamera = true;
      
        //       const videoElement = document.getElementById("inputVideo");
        //       this.mediaPiepeHands = new MediaPipeHands(videoElement, (landmarks) =>
        //         this.onMediaPipeHandsResults(landmarks)
        //       );
        //       this.mediaPiepeHands.start();
        //       enableWebcamButton.remove();
        //     });
        //   } else {
        //     console.warn("getUserMedia() is not supported by your browser");
        //   }


        // Game state
        let isGameRunning = true;

        // Define keys object
        const keys = { a: false, d: false, w: false, s: false };

        // Utility Functions
        // Trigger Game Over
        function triggerGameOver(message) {
        console.log(message);
        isGameRunning = false;
        document.getElementById('play-again-btn').style.display = 'block';
        }

        // Collision detection function
        function boxCollision({ box1, box2 }) {
        const xCollision = box1.position.x + box1.width / 2 >= box2.position.x - box2.width / 2 &&
                            box1.position.x - box1.width / 2 <= box2.position.x + box2.width / 2;
        const yCollision = box1.position.y - box1.height / 2 <= box2.position.y + box2.height / 2 &&
                            box1.position.y + box1.height / 2 >= box2.position.y - box2.height / 2;
        const zCollision = box1.position.z + box1.depth / 2 >= box2.position.z - box2.depth / 2 &&
                            box1.position.z - box1.depth / 2 <= box2.position.z + box2.depth / 2;
        return xCollision && yCollision && zCollision;
        }

        // Classes
        // Player Box class
        class PlayerBox extends BaseBox {
        constructor(params) {
            super(params);
            this.isPlayer = true;
        }

        update(ground, deltaTime) {
            if (!isGameRunning) return;

            // Call BaseBox update for movement
            super.update(deltaTime);

            // Collision with ground
            if (boxCollision({ box1: this, box2: ground })) {
            this.velocity.y *= -0.8; // Bounce effect
            this.position.y = ground.position.y + ground.height / 2 + this.height / 2;
            }

            // Check if player falls below ground
            const fallingThreshold = -5;
            if (this.position.y < fallingThreshold) {
            triggerGameOver('Player fell below ground.');
            }
        }
        }

        // Enemy Box class
        class EnemyBox extends BaseBox {
        constructor(params) {
            super(params);
        }

        update(ground, deltaTime) {
            if (!isGameRunning) return;

            // Call BaseBox update for movement
            super.update(deltaTime);

            // Ensure enemies stay above the ground
            if (this.position.y - this.height / 2 < ground.position.y + ground.height / 2) {
            this.position.y = ground.position.y + ground.height / 2 + this.height / 2;
            this.velocity.y = 0;
            }
        }
        }

        // Initialization
        // Player setup
        const player = new PlayerBox({
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
        const ground = new BaseBox({
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
        let spawnDelay = 30; // Number of frames to delay the first enemy spawn after restart

        // Input handler setup
        setupController(keys, isGameRunning, player);

        // Button Logic
        // Restart Game Logic
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
        spawnDelay = 30; // Reset the spawn delay on restart
        animate(0);
        });

        // Animation Loop
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

        // Spawn enemies
        if (frames > spawnDelay && frames % spawnRate === 0) {
            const enemy = new EnemyBox({
            width: 1,
            height: 1,
            depth: 1,
            position: { x: (Math.random() - 0.5) * 5, y: ground.position.y + ground.height / 2 + 1, z: -20 },
            velocity: { x: 0, y: 0, z: 0.0025 },
            zAcceleration: true,
            color: '#00ff00',
            });
            enemy.castShadow = true;
            scene.add(enemy);
            enemies.push(enemy);
        }

        frames++;
        sceneManager.render();
        requestAnimationFrame(animate);
        }

        // Start Animation Loop
        animate(0);
    }
    hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      }
}

document.addEventListener("DOMContentLoaded", () => {
    new App();
});


