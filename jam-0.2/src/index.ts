import { Engine, Scene, ArcRotateCamera, Vector3 } from "@babylonjs/core";

import { Game } from "./game";
import createScene from "./scene";

// init game
var game: Game = new Game();

// create engine with canvas on index.html
var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

// setup scene and camera
var scene: Scene = createScene(engine);
var camera: ArcRotateCamera = new ArcRotateCamera("Camera", 0, 0, 150, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// setup engnine render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});