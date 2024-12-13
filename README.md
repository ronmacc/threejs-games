<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center" style="background-color: #f39c12; color: white; padding: 10px; font-size: 20px; font-weight: bold;">
  WIP
</div>
<br />

<!-- GIF Section -->
<div align="center">
  <img src="./data/gametest.gif" alt="game-GIF" width="500">
</div>

<div align="center">
  <h3 align="center">Three.js Game Studies</h3>
  <p align="center" style="font-weight: bold;">
    Exploring Web-Based Interactive 3D Experiences with Three.js, OpenCV, and Mediapipe
  </p>
</div>

## About The Project

This repository explores building interactive 3D web-based tools and games. It combines:

- **Three.js**: For rendering 3D environments.
- **OpenCV** and **Mediapipe**: For real-time hand tracking and gesture recognition.

My focus is on studying camera-based interactive movements and integrating gesture detection with 3D environments to create engaging experiences.

## User Instructions

### Cube Game
1. Download the `cubeGame.html` file from the repository.
2. Double-click the file to open it in your browser.
3. Use the following controls to play:
   - **W**: Move forward
   - **S**: Move backward
   - **A**: Move left
   - **D**: Move right
   - **Space**: Jump (double jump is enabled)
4. To restart the game if you lose, press **F5**.

### Hand Tracking Script
1. Run the `handsLandmarksClick.py` file in your terminal.
2. Your camera will open up. Place your hand in view of the camera.
3. The system will recognize and track your hand movements:
   - **Index Tip (12)** and **Index Bottom (9)** positions are tracked.
   - If the tip (12) is lower than the bottom (9) in the screen's X,Y coordinates, the system detects a change.
4. To quit the application, press **Q**.

<!-- GIF Section -->
<div align="center">
  <img src="./data/openclose.gif" alt="game-GIF" width="500">
</div>
<!-- GIF Section -->
<div align="center">
  <img src="./data/movedrag.gif" alt="game-GIF" width="500">
</div>
