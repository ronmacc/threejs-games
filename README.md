# Three.js Game Studies

<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center" style="background-color: #f39c12; color: white; padding: 10px; font-size: 20px; font-weight: bold;">
  WIP
</div>
<br />
<div align="center">
  <h3 align="center">Three.js Game Studies</h3>
  <p align="center" style="font-weight: bold;">
    Exploring Web-Based Interactive 3D Experiences with Three.js, OpenCV, and Mediapipe<br>
    <a href="mailto:andres.roncal@students.iaac.net" target="_blank">Report Bug</a>
    ·
    <a href="mailto:andres.roncal@students.iaac.net" target="_blank">Request Feature</a>
  </p>
</div>

<!-- GIF Section -->
<div align="center">
  <img src="./assets/images/game-preview.gif" alt="Project GIF" width="500">
</div>

---

## About The Project

This repository is part of my explorations into building interactive 3D web-based games and tools. The goal is to integrate hand gesture detection with 3D rendering engines to create unique user experiences. The project uses:

- **Three.js**: For rendering 3D environments.
- **OpenCV** and **Mediapipe**: For real-time hand tracking and gesture recognition.

### Key Features

- **Collision Detection**: Real-time collision handling between 3D objects.
- **Gesture-Based Interaction**: Control game elements using hand gestures.
- **Physics Simulation**: Basic physics like gravity and velocity applied to objects.
- **Dynamic Lighting and Shadows**: Create a visually engaging environment.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Objectives

- Explore hand tracking technologies to integrate with Three.js.
- Build reusable components for collision detection, physics, and controls.
- Study interoperability between OpenCV, Mediapipe, and Three.js for real-time applications.
- Develop a functional prototype that uses hand gestures as primary input.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Methodology

### 1. **Setup**

- **Three.js**: Render 3D scenes with interactive elements.
- **OpenCV and Mediapipe**: Track hand landmarks for gesture recognition.
- **Physics and Collisions**: Develop a Box class with basic physics and collision detection.

### 2. **Game Features**

- Implement user-controlled objects.
- Enable object spawning and dynamic interaction.
- Add hand gesture-based controls for natural interactions.

### 3. **Integration**

Combine data from Mediapipe hand tracking with Three.js events for seamless control of 3D elements.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Tools and Frameworks

- **Three.js**: For rendering and visualizing 3D content.
- **OpenCV**: For image processing and computer vision tasks.
- **Mediapipe**: For real-time hand tracking.
- **JavaScript/HTML**: To structure and script the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## How to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open the application in your browser at `http://localhost:3000`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Learning Highlights

- **Hand Detection and Gesture Control**:
  - Used Mediapipe to track hand landmarks.
  - Converted landmarks into gestures (e.g., "Open" or "Closed" fist).
- **Collision Detection**:
  - Developed a custom collision detection function for Box objects.
- **Physics Simulation**:
  - Implemented gravity and velocity updates to simulate object interactions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Current Status

- Basic game mechanics and hand gesture detection are implemented.
- Real-time interaction between 3D objects and user input is functional.
- Testing and optimization of performance are ongoing.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contact

**Andres Roncal**  
Architect/Engineer turned developer  
Email: [andres.roncal@students.iaac.net](mailto:andres.roncal@students.iaac.net)  
LinkedIn: [Andres Roncal](https://www.linkedin.com/in/andres-roncal-1b148a132/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
