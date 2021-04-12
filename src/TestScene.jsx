import React from "react";
import { Vector3, HemisphericLight, ArcRotateCamera, SceneLoader, MeshBuilder, StandardMaterial, Color3, Texture, InterpolateValueAction, ActionManager, ExecuteCodeAction, Color4 } from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';
import "./App.css";



const TestScene = ({ testProp, testClick }) => {
  
  //? we define the variables outside the function, then alter them within, so they are available to the onRender function (that is animating them)
  let box;
  let suzanne;
  let arch;
  let floor;
  let poster;
  
  //? create scale up on mouseOver functions (hovering over one effects different mesh)
  function scaleOnHover(triggerMesh, targetMesh) {
    triggerMesh.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOverTrigger, targetMesh, 'scaling', new Vector3(1.2,1.2,1.2), 100))
    triggerMesh.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOutTrigger, targetMesh, 'scaling', new Vector3(1,1,1), 300))
  }
  
  //? click event that logs to console
  function logOnClick(mesh) {
    mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, () => console.log(`${mesh} clicked`)))
  }
  
  //? sending click event up and then to DisplayPanel
  function clickMesh(mesh) {
    mesh.actionManager.registerAction
      (new ExecuteCodeAction
        (ActionManager.OnPickTrigger, () => {testClick()}
        )
      );
  }
  
  
  const onSceneReady = (scene) => {

    //? sets the background (sky) to transparent
    scene.clearColor = new Color4(0, 0, 0, 0);

    // This creates and positions a free camera (non-mesh)
    var camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(7, 7, 0), scene);
    // This targets the camera to scene origin
    camera.setTarget(new Vector3(...testProp));
    const canvas = scene.getEngine().getRenderingCanvas();
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    // eslint-disable-next-line no-unused-vars
    var light = new HemisphericLight("light", new Vector3(5, 1, 3), scene);
    
    // create new materials for the 3 objects:
    //? rgb values between 0-1, selected in css file colorPicker and then used following function to convert in console:
    // function colorConvert(r ,g ,b) {return `(${r/256},${g/256},${b/256})`}
    const archMat = new StandardMaterial("archMat", scene);
    archMat.diffuseTexture = new Texture("./assets/archTexture.jpg", scene);
    const floorMat = new StandardMaterial("groundMat", scene);
    floorMat.diffuseColor = new Color3(0.38671875,0.515625,0.6640625);
    const boxMat = new StandardMaterial("boxMat", scene);
    boxMat.diffuseColor = new Color3(0.34375,0.015625,0.14453125);
    const suzanneMat = new StandardMaterial("suzanneMat", scene);
    suzanneMat.diffuseColor = new Color3(0.5859375,0.5,0.11328125);
    const posterMat = new StandardMaterial("posterMat");
    posterMat.diffuseTexture = new Texture("./assets/lammy.png", scene);
  
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1.3;
  
    // Our built-in 'box' shape.
    box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.material = posterMat;
    //? must be added for hover/click events to work
    box.actionManager = new ActionManager(scene)
  
    // eslint-disable-next-line no-unused-vars
    SceneLoader.ImportMeshAsync("", "./assets/", "fifth_test.babylon", scene).then((result) => {
      suzanne = scene.getMeshByName("suzanne")
      suzanne.material = suzanneMat
      suzanne.position.x = 4
      suzanne.actionManager = new ActionManager(scene)
      arch = scene.getMeshByName("arch")
      arch.material = archMat
      arch.actionManager = new ActionManager(scene)
      floor = scene.getMeshByName("floor")
      floor.material = floorMat
      floor.actionManager = new ActionManager(scene)
      poster = scene.getMeshByName("poster")
      poster.material = boxMat;
      poster.actionManager = new ActionManager(scene)
      scaleOnHover(arch, suzanne);
      logOnClick(arch, scene)
      logOnClick(suzanne, scene)
      logOnClick(floor, scene)
      clickMesh(suzanne)
      box.actionManager = new ActionManager(scene)
      scaleOnHover(box, arch);
    })
    // Move the box upward 1/2 its height
    box.position.y = 1;
    // Our built-in 'ground' shape.
    // MeshBuilder.CreateGround("ground", { width: 10, height: 6 }, scene);
    // box.actionManager = new ActionManager(scene)
    // suzanne.actionManager = new ActionManager(scene)
  };
  
  
  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  const onRender = (scene) => {
    if (box !== undefined) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
      const rpm = 10;
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1500);
      box.rotation.x += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 3000);
      box.rotation.z += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 2000);
    }
    if (suzanne !== undefined) {
      const rpm = 10;
      suzanne.rotation.y += (rpm / 60) * Math.PI * -2 * (deltaTimeInMillis / 2000);
      // suzanne.position.x += 0.01  //? moves suzanne slowly across the floor... 
    }
  };


  return (
    <div>
      <p>{testProp}</p>
      <SceneComponent 
        antialias={true} 
        onSceneReady={onSceneReady} 
        onRender={onRender} 
        id="my-canvas" 
        style={{width: '80%', outline: "none"}} // outline set to none to ge floating image style
      />
    </div>
  )
};

export default TestScene