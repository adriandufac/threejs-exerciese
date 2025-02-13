import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) return instance; // singleton
    instance = this;
    window.experience = this; // just to access it in the console

    //options
    this.canvas = canvas;

    //setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();

    // resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  // propagate from experience to children
  resize() {
    this.camera.resize();
  }
  update() {
    this.camera.update();
  }
}
