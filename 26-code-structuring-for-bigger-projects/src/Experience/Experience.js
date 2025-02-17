import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import Debug from "./Utils/Degug.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) return instance; // singleton
    instance = this;
    window.experience = this; // just to access it in the console

    //options
    this.canvas = canvas;

    //setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

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
    console.log("resize triggered");
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
  destroy() {
    this.sizes.off("resize");
    this.sizes.off("tick");

    //Traverse the whole scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        //dispose the geometry
        child.geometry.dispose();
        //dispose the material
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    //controls
    this.camera.controls.dispose();

    //renderer
    this.renderer.instance.dispose();

    //debug
    if (this.debug.active) {
      this.debug.ui.destroy;
    }
  }
}
