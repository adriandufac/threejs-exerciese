import * as THREE from "three";
import gsap from "gsap";
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

let time = Date.now();

const clock = new THREE.Clock();

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
// Animations
const tick = () => {
  // Time
  /*  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime; */
  // we use the time so the animation is the same on all devices (doesnt change according to the framerate)

  /*   const elapsedTime = clock.getElapsedTime();

  // Update objects
  mesh.rotation.y = 2 * elapsedTime;
  mesh.position.x = 2 * Math.sin(2 * elapsedTime); */

  renderer.render(scene, camera);

  requestAnimationFrame(tick); // Call tick() every frame
};

tick();
