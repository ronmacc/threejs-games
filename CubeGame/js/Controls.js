export class Controls {
    constructor(player) {
      this.player = player;
      this.keys = {
        a: { pressed: false },
        d: { pressed: false },
        w: { pressed: false },
        s: { pressed: false },
      };
  
      window.addEventListener('keydown', (event) => this.handleKeyDown(event));
      window.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }
  
    handleKeyDown(event) {
      switch (event.code) {
        case 'KeyA': this.keys.a.pressed = true; break;
        case 'KeyD': this.keys.d.pressed = true; break;
        case 'KeyW': this.keys.w.pressed = true; break;
        case 'KeyS': this.keys.s.pressed = true; break;
        case 'Space': this.player.velocity.y = 0.2; break;
      }
    }
  
    handleKeyUp(event) {
      switch (event.code) {
        case 'KeyA': this.keys.a.pressed = false; break;
        case 'KeyD': this.keys.d.pressed = false; break;
        case 'KeyW': this.keys.w.pressed = false; break;
        case 'KeyS': this.keys.s.pressed = false; break;
      }
    }
  
    update() {
      this.player.velocity.x = 0;
      this.player.velocity.z = 0;
      if (this.keys.a.pressed) this.player.velocity.x = -0.1;
      if (this.keys.d.pressed) this.player.velocity.x = 0.1;
      if (this.keys.w.pressed) this.player.velocity.z = -0.1;
      if (this.keys.s.pressed) this.player.velocity.z = 0.1;
    }
  }
  