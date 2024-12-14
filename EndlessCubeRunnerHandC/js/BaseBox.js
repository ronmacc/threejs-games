import * as THREE from "three";

export class BaseBox extends THREE.Mesh {
  constructor({ width, height, depth, color, velocity = { x: 0, y: 0, z: 0 }, position = { x: 0, y: 0, z: 0 }, zAcceleration = false }) {
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
  }

  update(deltaTime) {
    // Basic movement updates
    this.position.x += this.velocity.x * deltaTime;
    this.position.z += this.velocity.z * deltaTime;

    if (this.zAcceleration) this.velocity.z += 0.001 * deltaTime;

    this.velocity.y += this.gravity * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }
}