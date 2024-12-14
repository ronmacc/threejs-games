export function setupController(keys, isGameRunning, player) {
    window.addEventListener('keydown', (e) => {
        if (!isGameRunning) return;
        if (e.code === 'KeyA') keys.a = true;
        if (e.code === 'KeyD') keys.d = true;
        if (e.code === 'KeyW') keys.w = true;
        if (e.code === 'KeyS') keys.s = true;
        if (e.code === 'Space') player.velocity.y = 0.2; // Jump velocity
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'KeyA') keys.a = false;
        if (e.code === 'KeyD') keys.d = false;
        if (e.code === 'KeyW') keys.w = false;
        if (e.code === 'KeyS') keys.s = false;
    });
}
