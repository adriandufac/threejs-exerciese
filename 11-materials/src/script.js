import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/**DEBUG */
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/***
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Objects
 */

const material = new THREE.MeshBasicMaterial();
material.map = doorColorTexture;

const material2 = new THREE.MeshNormalMaterial();
const material3 = new THREE.MeshLambertMaterial();
const material4 = new THREE.MeshPhongMaterial();
const material5 = new THREE.MeshToonMaterial();
const material6 = new THREE.MeshStandardMaterial();

material4.shininess = 100;
material4.specular = new THREE.Color(0x1188ff);
material5.gradientMap = gradientTexture;

material6.roughness = 0.7;
material6.metalness = 0.2;
material6.map = doorColorTexture;
material6.aoMap = doorAmbientOcclusionTexture;

gui.add(material6, "roughness").min(0).max(1).step(0.01);
gui.add(material6, "metalness").min(0).max(1).step(0.01);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32);
const sphere = new THREE.Mesh(sphereGeometry, material4);
const plane = new THREE.Mesh(planeGeometry, material3);

const torus = new THREE.Mesh(torusGeometry, material6);
sphere.translateX(-1.5);
torus.translateX(1.5);
scene.add(sphere, plane, torus);

/**
 * Lights
 */
/* const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(ambientLight, pointLight); */

/**
 * Environment map
 */

const rgbeLoader = new RGBELoader();
rgbeLoader.setDataType(THREE.HalfFloatType);
rgbeLoader.load("/textures/environmentMap/2k.hdr", (map) => {
  map.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = map;
  scene.environment = map;
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = elapsedTime * 0.1;
  plane.rotation.y = elapsedTime * 0.1;
  torus.rotation.y = elapsedTime * 0.1;

  sphere.rotation.x = -elapsedTime * 0.15;
  plane.rotation.x = -elapsedTime * 0.15;
  torus.rotation.x = -elapsedTime * 0.15;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
