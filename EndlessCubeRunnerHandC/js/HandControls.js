import * as THREE from "three";

export class HandControls extends THREE.EventDispatcher {
  constructor(renderer, camera, scene) {
    super();
    this.renderer = renderer; // Renderer for 2D position calculation
    this.camera = camera;
    this.scene = scene;

    this.handsObj = null; // 3D representation of the hand (optional)
    this.gestureText = document.createElement("div"); // To display gesture status
    this.initTextDisplay();
  }

  initTextDisplay() {
    // Create and style the HTML element for gesture display
    this.gestureText.style.position = "absolute";
    this.gestureText.style.top = "20px";
    this.gestureText.style.left = "20px";
    this.gestureText.style.color = "red";
    this.gestureText.style.fontSize = "24px";
    this.gestureText.style.fontFamily = "Arial, sans-serif";
    document.body.appendChild(this.gestureText);
  }

  update(landmarks) {
    if (landmarks.multiHandLandmarks.length === 1) {
      const handLandmarks = landmarks.multiHandLandmarks[0];

      // Extract 3D positions of landmarks 9 and 12
      const point9 = new THREE.Vector3(
        -handLandmarks[9].x + 0.5,
        -handLandmarks[9].y + 0.5,
        -handLandmarks[9].z
      ).multiplyScalar(4);
      const point12 = new THREE.Vector3(
        -handLandmarks[12].x + 0.5,
        -handLandmarks[12].y + 0.5,
        -handLandmarks[12].z
      ).multiplyScalar(4);

      // Determine if the hand is open or closed based on Y-coordinates
      const handStatus = point12.y > point9.y ? "CLOSED" : "OPEN";

      // Display the gesture status on the webpage
      this.gestureText.innerHTML = `Gesture: ${handStatus}`;

      // Optionally, update positions of spheres representing points 9 and 12
      if (this.handsObj) {
        this.handsObj.children[0].position.copy(point9); // Point 9
        this.handsObj.children[1].position.copy(point12); // Point 12
      }
    }
  }

  createHandRepresentation() {
    // Optionally create 3D spheres for landmarks 9 and 12
    this.handsObj = new THREE.Object3D();
    const sphereMat = new THREE.MeshNormalMaterial();
    const sphereGeo = new THREE.SphereGeometry(0.05, 16, 16);

    // Add two spheres for points 9 and 12
    const sphere9 = new THREE.Mesh(sphereGeo, sphereMat);
    const sphere12 = new THREE.Mesh(sphereGeo, sphereMat);
    this.handsObj.add(sphere9);
    this.handsObj.add(sphere12);

    this.scene.add(this.handsObj);
  }
}
