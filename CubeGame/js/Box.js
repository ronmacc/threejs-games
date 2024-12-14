import * as THREE from 'three';

export class Box extends THREE.Mesh {
  constructor({ width, height, depth, color = '#ff0000', velocity = {}, position = {}, zAcceleration = false }) {
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
    this.gravity = -0.02;
    this.zAcceleration = zAcceleration;
  }

  update(ground) {
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    if (this.zAcceleration) this.velocity.z += 0.001;

    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;

    // Check collision with ground
    if (this.position.y - this.height / 2 <= ground.position.y + ground.height / 2) {
      this.velocity.y = -this.velocity.y * 0.8; // Bounce effect
      this.position.y = ground.position.y + ground.height / 2 + this.height / 2;
    }
  }
}
