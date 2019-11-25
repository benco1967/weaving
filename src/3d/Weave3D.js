import React, {useRef, useEffect, useState} from 'react';
import * as BABYLON from 'babylonjs';


const createScene = (canvas) => {
  const engine = new BABYLON.Engine(canvas, true);

  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(.5, .5, .5);

  // camera
  const camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(6, 6, -0), scene);
  camera.setPosition(new BABYLON.Vector3(6, 6, -15));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
  light.intensity = 0.7;

  const spot = new BABYLON.SpotLight("spot", new BABYLON.Vector3(25, 15, -10), new BABYLON.Vector3(-1, -0.8, 1), 15, 1, scene);
  spot.diffuse = new BABYLON.Color3(1, 1, 1);
  spot.specular = new BABYLON.Color3(0, 0, 0);
  spot.intensity = 0.8;

  return scene;
};

const createYarn = (scene, name, path) => {
  const mat = new BABYLON.StandardMaterial("mat1", scene);
  mat.alpha = 1.0;
  mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
  mat.backFaceCulling = false;
  mat.wireframe = false;

  const tube = BABYLON.Mesh.CreateTube(name, path, .4, 60, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
  tube.material = mat;
};

const getWeftYarnPath = (weftHeight, weaveWidth, weaveHeight, x) => {
  const path = [];
  for (let y = 0; y < weaveHeight; y++) {
    path.push(new BABYLON.Vector3(x, y, weftHeight[x + y * weaveWidth]));
  }
  return path;
};

const createWeftYarns = (weftHeight, weaveWidth, weaveHeight, scene) => {

  for(let x = 0; x < weaveWidth; x++) {
    const path = getWeftYarnPath(weftHeight, weaveWidth, weaveHeight, x);
    createYarn(scene, "weft" + x, path);
  }
};

const getWarpYarnPath = (warpHeight, weaveWidth, weaveHeight, y) => {
  const path = [];
  for (let x = 0; x < weaveWidth; x++) {
    path.push(new BABYLON.Vector3(x, y, warpHeight[x + y * weaveWidth]));
  }
  return path;
};

const createWarpYarns = (warpHeight, weaveWidth, weaveHeight, scene) => {

  for(let y = 0; y < weaveHeight; y++) {
    const path = getWarpYarnPath(warpHeight, weaveWidth, weaveHeight, y);
    createYarn(scene, "warp" + y, path);
  }
};

const Weave3D = ({currentHeightBuffer, heightBuffers}) => {

    const canvasRef = useRef(null);

    useEffect(() => {
      const scene = createScene(canvasRef.current);
      const weftHeight = heightBuffers.weftHeightBuffers[currentHeightBuffer];
      const warpHeight = heightBuffers.warpHeightBuffers[currentHeightBuffer];
      createWeftYarns(weftHeight, heightBuffers.weaveWidth, heightBuffers.weaveHeight, scene);
      createWarpYarns(warpHeight, heightBuffers.weaveWidth, heightBuffers.weaveHeight, scene);
      scene.render();
    });

    return (
      <canvas ref={canvasRef} width={400} height={300}/>
    );
  }
;

export default Weave3D;

