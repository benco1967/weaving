import React, {useRef, useEffect, useState} from 'react';
import * as BABYLON from 'babylonjs';
import * as hermite from 'cubic-hermite';


const RADIUS = 0.4;
const createEngine = canvas => {
  return new BABYLON.Engine(canvas, true);
};

const createScene = (canvas, engine, weaveWidth, weaveHeight) => {

  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(.5, .5, .5);

  // camera
  const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(6, -6, -0), scene);
  camera.setPosition(new BABYLON.Vector3(6, -6, -15));
  camera.attachControl(canvas, true, false);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, -15), scene);
  light.intensity = 0.5;

  const light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, 0, 15), scene);
  light.intensity = 0.5;

  /*const spot = new BABYLON.SpotLight("spot", new BABYLON.Vector3(25, 15, -10), new BABYLON.Vector3(-1, -0.8, 1), 15, 1, scene);
  spot.diffuse = new BABYLON.Color3(1, 1, 1);
  spot.specular = new BABYLON.Color3(0, 0, 0);
  spot.intensity = 0.1;
*/
  // Move the light with the camera
  scene.registerBeforeRender(function () {
    light.position = camera.position;
  });

  return scene;
};

const createYarn = (scene, name, path, color) => {
  const mat = new BABYLON.StandardMaterial("mat1", scene);
  mat.alpha = 1.0;
  mat.diffuseColor = color;
  mat.backFaceCulling = false;
  mat.wireframe = false;

  const yarn = BABYLON.Mesh.CreateTube(name, path, RADIUS, 60, null, BABYLON.Mesh.CAP_ALL, scene, true, BABYLON.Mesh.FRONTSIDE);
  yarn.material = mat;
  return yarn;
};

const getWarpYarnPath = (warpHeight, weaveWidth, weaveHeight, x) => {
  const path = [];
  for (let y = 0; y < weaveHeight; y++) {
    path.push(new BABYLON.Vector3(x, -y, warpHeight[x + y * weaveWidth]));
  }
  return path;
};

const createWarpYarns = (warpHeight, weaveWidth, weaveHeight, yarns, colors, scene) => {
  const yarnsTube = [];
  for (let x = 0; x < weaveWidth; x++) {
    const path = getWarpYarnPath(warpHeight, weaveWidth, weaveHeight, x);
    yarnsTube.push(createYarn(scene, "warp" + x, path, colors[yarns[x % yarns.length]]));
  }
  return yarnsTube;
};

const updateWarpYarns = (warpHeight, weaveWidth, weaveHeight, yarnsTube) =>
  yarnsTube.map((yarn, x) => {
    const path = getWarpYarnPath(warpHeight, weaveWidth, weaveHeight, x);
    return BABYLON.Mesh.CreateTube(null, path, RADIUS, null, null, null, null, null, null, yarn);
  });


const getWeftYarnPath = (weftHeight, weaveWidth, weaveHeight, y) => {
  const path = [];
  for (let x = 0; x < weaveWidth; x++) {
    path.push(new BABYLON.Vector3(x, -y, weftHeight[x + y * weaveWidth]));
  }
  return path;
};

const createWeftYarns = (weftHeight, weaveWidth, weaveHeight, yarns, colors, scene) => {
  const yarnsTube = [];
  for (let y = 0; y < weaveHeight; y++) {
    const path = getWeftYarnPath(weftHeight, weaveWidth, weaveHeight, y);
    yarnsTube.push(createYarn(scene, "weft" + y, path, colors[yarns[y % yarns.length]]));
  }
  return yarnsTube;
};
const updateWeftYarns = (weftHeight, weaveWidth, weaveHeight, yarnsTube) =>
  yarnsTube.map((yarn, y) => {
    const path = getWeftYarnPath(weftHeight, weaveWidth, weaveHeight, y);
    return BABYLON.Mesh.CreateTube(null, path, RADIUS, null, null, null, null, null, null, yarn);
  });


const Weave3D = ({physical, warpYarns, warpColors, weftYarns, weftColors}) => {

  const babylone = useRef({});
  const canvasRef = useRef(null);

  useEffect(() => {
    let {engine, scene, weftYarnsTube, warpYarnsTube} = babylone.current;
    engine = createEngine(canvasRef.current);
    scene = createScene(canvasRef.current, engine, physical.weaveWidth, physical.weaveHeight);
    weftYarnsTube = createWeftYarns(physical.weftHeight, physical.weaveWidth, physical.weaveHeight, weftYarns, weftColors, scene);
    warpYarnsTube = createWarpYarns(physical.warpHeight, physical.weaveWidth, physical.weaveHeight, warpYarns, warpColors, scene);
    engine.runRenderLoop(() => {
      if (physical.status === 'computing') {
        weftYarnsTube = updateWeftYarns(physical.weftHeight, physical.weaveWidth, physical.weaveHeight, weftYarnsTube);
        warpYarnsTube = updateWarpYarns(physical.warpHeight, physical.weaveWidth, physical.weaveHeight, warpYarnsTube);
      }
      scene.render();
    });
    babylone.current = {engine, scene, weftYarnsTube, warpYarnsTube};

    return () => {
      engine.dispose();
    }
  }, []);

  return (
    <canvas ref={canvasRef} width={400} height={400}/>
  );
};

export default Weave3D;

