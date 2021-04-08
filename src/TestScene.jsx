import React from "react";
import { Vector3, HemisphericLight, ArcRotateCamera, SceneLoader, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';
import "./App.css";

//? we define the variables outside the function, then alter them within, so they are available to the onRender function (that is animating them)
let box;
let suzanne;
let arch;
let floor;

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(6, 1, 2), scene);
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());
  const canvas = scene.getEngine().getRenderingCanvas();
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  // eslint-disable-next-line no-unused-vars
    var light = new HemisphericLight("light", new Vector3(5, 1, 0), scene);
  
  // create new materials for the 3 objects:
  //? rgb values between 0-1, selected in css file colorPicker and then used following function to convert in console:
  // function colorConvert(r ,g ,b) {return `(${r/256},${g/256},${b/256})`}
  const archMat = new StandardMaterial("archMat", scene);
  archMat.diffuseColor = new Color3(0.7109375,0.91015625,0.546875);
  const floorMat = new StandardMaterial("groundMat", scene);
  floorMat.diffuseColor = new Color3(0.38671875,0.515625,0.6640625);
  const boxMat = new StandardMaterial("boxMat", scene);
  boxMat.diffuseColor = new Color3(0.34375,0.015625,0.14453125);
  const suzanneMat = new StandardMaterial("suzanneMat", scene);
  suzanneMat.diffuseColor = new Color3(0.5859375,0.5,0.11328125);


  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 1;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
  box.material = boxMat; 

  // eslint-disable-next-line no-unused-vars
  SceneLoader.ImportMeshAsync("", "./assets/", "third_test.babylon", scene).then((result) => {
    suzanne = scene.getMeshByName("suzanne")
    suzanne.material = suzanneMat
    arch = scene.getMeshByName("arch")
    arch.scaling.y = 2;
    arch.material = archMat
    floor = scene.getMeshByName("floor")
    floor.material = floorMat
  })
  // Move the box upward 1/2 its height
  box.position.y = 1;
  // Our built-in 'ground' shape.
  // MeshBuilder.CreateGround("ground", { width: 10, height: 6 }, scene);
};


/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 700);
    box.rotation.x += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 300);
    box.rotation.z += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 2000);
  }
  if (suzanne !== undefined) {
    const rpm = 10;
    suzanne.rotation.y += (rpm / 60) * Math.PI * -2 * (deltaTimeInMillis / 2000);
    // suzanne.position.x += 0.01  //? moves suzanne slowly across the floor... 
  }
};


const TestScene = () => (
  <div>
    <SceneComponent 
      antialias={true} 
      onSceneReady={onSceneReady} 
      onRender={onRender} 
      id="my-canvas" 
      style={{width: '80%'}} 
    />
  </div>
);

export default TestScene