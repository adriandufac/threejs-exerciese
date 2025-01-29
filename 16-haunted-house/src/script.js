import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/addons/objects/Sky.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/** Textures */
const textureLoader = new THREE.TextureLoader();

//Floor
const floorAlphaMap = textureLoader.load("floor/alpha.webp");

const floorTextureColor = textureLoader.load(
  "floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"
);
floorTextureColor.repeat.set(8, 8);
floorTextureColor.wrapS = THREE.RepeatWrapping;
floorTextureColor.wrapT = THREE.RepeatWrapping;
floorTextureColor.colorSpace = THREE.SRGBColorSpace;

const floorTextureNormal = textureLoader.load(
  "floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"
);
floorTextureNormal.repeat.set(8, 8);
floorTextureNormal.wrapS = THREE.RepeatWrapping;
floorTextureNormal.wrapT = THREE.RepeatWrapping;

const floorTextureARM = textureLoader.load(
  "floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"
);
floorTextureARM.repeat.set(8, 8);
floorTextureARM.wrapS = THREE.RepeatWrapping;
floorTextureARM.wrapT = THREE.RepeatWrapping;

const floorTextureDisplacement = textureLoader.load(
  "floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"
);
floorTextureDisplacement.repeat.set(8, 8);
floorTextureDisplacement.wrapS = THREE.RepeatWrapping;
floorTextureDisplacement.wrapT = THREE.RepeatWrapping;

// walls

const wallsTextureColor = textureLoader.load(
  "wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp"
);
wallsTextureColor.colorSpace = THREE.SRGBColorSpace;
const wallsTextureARM = textureLoader.load(
  "wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp"
);
const wallsTextureNormal = textureLoader.load(
  "wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp"
);

//roof
const roofTextureColor = textureLoader.load(
  "roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp"
);
roofTextureColor.colorSpace = THREE.SRGBColorSpace;

const roofTextureARM = textureLoader.load(
  "roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp"
);

const roofTextureNormal = textureLoader.load(
  "roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp"
);

roofTextureColor.repeat.set(3, 1);
roofTextureNormal.repeat.set(3, 1);
roofTextureARM.repeat.set(3, 1);
roofTextureColor.wrapS = THREE.RepeatWrapping;
roofTextureNormal.wrapS = THREE.RepeatWrapping;
roofTextureARM.wrapS = THREE.RepeatWrapping;

// bushes

const bushesTextureColor = textureLoader.load(
  "bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp"
);
bushesTextureColor.colorSpace = THREE.SRGBColorSpace;
const bushesTextureARM = textureLoader.load(
  "bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp"
);
const bushesTextureNormal = textureLoader.load(
  "bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp"
);

bushesTextureColor.repeat.set(2, 1);
bushesTextureNormal.repeat.set(2, 1);
bushesTextureARM.repeat.set(2, 1);
bushesTextureColor.wrapS = THREE.RepeatWrapping;
bushesTextureNormal.wrapS = THREE.RepeatWrapping;
bushesTextureARM.wrapS = THREE.RepeatWrapping;
/* bushesTextureColor.wrapT = THREE.RepeatWrapping;
bushesTextureNormal.wrapT = THREE.RepeatWrapping;
bushesTextureARM.wrapT = THREE.RepeatWrapping;
 */

//graves
const graveTextureColor = textureLoader.load(
  "grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp"
);
graveTextureColor.colorSpace = THREE.SRGBColorSpace;

const graveTextureARM = textureLoader.load(
  "grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp"
);

const graveTextureNormal = textureLoader.load(
  "grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp"
);
graveTextureColor.repeat.set(0.3, 0.4);
graveTextureNormal.repeat.set(0.3, 0.4);
graveTextureARM.repeat.set(0.3, 0.4);
graveTextureColor.wrapS = THREE.RepeatWrapping;
graveTextureNormal.wrapS = THREE.RepeatWrapping;
graveTextureARM.wrapS = THREE.RepeatWrapping;
graveTextureColor.wrapT = THREE.RepeatWrapping;
graveTextureNormal.wrapT = THREE.RepeatWrapping;
graveTextureARM.wrapT = THREE.RepeatWrapping;

//door
//graves
const doorTextureColor = textureLoader.load("door/color.webp");
doorTextureColor.colorSpace = THREE.SRGBColorSpace;
const doorTextureAlpha = textureLoader.load("door/alpha.webp");
const doorTextureAmbientOcclusion = textureLoader.load(
  "door/ambientOcclusion.webp"
);
const doorTextureHeight = textureLoader.load("door/height.webp");
const doorTextureMetalness = textureLoader.load("door/metalness.webp");
const doorTextureRoughtness = textureLoader.load("door/roughness.webp");
const doorTextureNormal = textureLoader.load("door/normal.webp");

/**
 * House
 */

// Floor

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    roughness: 0.7,
    alphaMap: floorAlphaMap,
    transparent: true,
    map: floorTextureColor,
    aoMap: floorTextureARM,
    roughnessMap: floorTextureARM,
    metalnessMap: floorTextureARM,
    displacementMap: floorTextureDisplacement,
    displacementScale: 0.3,
    displacementBias: -0.2,
    normalMap: floorTextureNormal,
  })
);
gui.add(floor.material, "displacementScale").min(0).max(1).step(0.001);
gui.add(floor.material, "displacementBias").min(-1).max(1).step(0.001);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

//House
const house = new THREE.Group();

//Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallsTextureColor,
    aoMap: wallsTextureARM,
    roughnessMap: wallsTextureARM,
    metalnessMap: wallsTextureARM,
    normalMap: wallsTextureNormal,
  })
);
walls.position.y = 1.25;
//roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.2, 1, 4),
  new THREE.MeshStandardMaterial({
    map: roofTextureColor,
    aoMap: roofTextureARM,
    roughnessMap: roofTextureARM,
    metalnessMap: roofTextureARM,
    normalMap: roofTextureNormal,
  })
);
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI * 0.25;

//door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorTextureColor,
    alphaMap: doorTextureAlpha,
    transparent: true,
    aoMap: doorTextureAmbientOcclusion,
    displacementMap: doorTextureHeight,
    displacementScale: 0.1,
    displacementBias: -0.04,
    metalnessMap: doorTextureMetalness,
    roughnessMap: doorTextureRoughtness,
    normalMap: doorTextureNormal,
  })
);
door.position.z = 2.0001;
door.position.y = 1;
house.add(door);
house.add(roof);
house.add(walls);
scene.add(house);

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#89c854",
  map: bushesTextureColor,
  aoMap: bushesTextureARM,
  roughnessMap: bushesTextureARM,
  metalnessMap: bushesTextureARM,
  normalMap: bushesTextureNormal,
});
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.rotation.x = -0.75;
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.4, 0.1, 2.1);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.rotation.x = -0.75;
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.rotation.x = -0.75;
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.05, 2.6);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.rotation.x = -0.75;
scene.add(bush1);
scene.add(bush2);
scene.add(bush3);
scene.add(bush4);

//graves

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveTextureColor,
  aoMap: graveTextureARM,
  roughnessMap: graveTextureARM,
  metalnessMap: graveTextureARM,
  normalMap: graveTextureNormal,
});

const graves = new THREE.Group();
scene.add(graves);
for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, Math.random() * 0.4, z);
  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2, 2.2);
house.add(doorLight);

//GHOSTS
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0088", 6);
scene.add(ghost1, ghost2, ghost3);

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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
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

/*Shadows */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//casts and receives shadows
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;

graves.children.forEach((grave) => {
  grave.castShadow = true;
  grave.receiveShadow = true;
});

floor.receiveShadow = true;

//mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

/**Sky */

const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

/*Fog */
//scene.fog = new THREE.Fog("#02343f", 1, 15);
scene.fog = new THREE.FogExp2("#02343f", 0.1);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  //Ghost
  const radius = 4;
  const ghost1Angle = elapsedTime * 0.5;
  const x1 = Math.sin(ghost1Angle) * radius;
  const y1 =
    Math.sin(ghost1Angle) *
    Math.sin(ghost1Angle * 2.34) *
    Math.sin(ghost1Angle * 3.45);
  const z1 = Math.cos(ghost1Angle) * radius;
  ghost1.position.set(x1, y1, z1);

  const radius2 = 5;
  const ghost2Angle = -elapsedTime * 0.38;
  const x2 = Math.sin(ghost2Angle) * radius2;
  const y2 =
    Math.sin(ghost2Angle) *
    Math.sin(ghost2Angle * 2.34) *
    Math.sin(ghost2Angle * 3.45);
  const z2 = Math.cos(ghost2Angle) * radius2;
  ghost2.position.set(x2, y2, z2);

  const radius3 = 6;
  const ghost3Angle = elapsedTime * 0.23;
  const x3 = Math.sin(ghost3Angle) * radius3;
  const y3 =
    Math.sin(ghost3Angle) *
    Math.sin(ghost3Angle * 2.34) *
    Math.sin(ghost3Angle * 3.45);
  const z3 = Math.cos(ghost3Angle) * radius3;
  ghost3.position.set(x3, y3, z3);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
