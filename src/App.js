import React, {useState, useEffect} from 'react';
import './App.css';
import {getTwillWeave} from "./weaving/twill";
import SwitchWeave from "./molecule/SwitchWeave";
import {computeHeight, initHeightBuffers} from "./weaving/physicalSimulation";
import {getEmbossedWeave} from "./weaving/embossed";
import {getBraidedWeave} from "./weaving/braided";
import {getPlainWeave} from "./weaving/plain";
import Weave3D from "./3d/Weave3D";

const colors = ['blue', 'green', 'yellow', 'orange', 'red', 'magenta', 'white', 'black'];
const warp = [2];
const weft = [3];

const weave =
//getPlainWeave();
  getEmbossedWeave();
//getTwillWeave('3 3');
//getBraidedWeave('3 3', '4 4');


let heightBuffers = initHeightBuffers(weave);


const App = () => {
  const [zoom, setZoom] = useState(8);
  const [grid, setGrid] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (step < 4000) {
          setStep(computeHeight(heightBuffers, step));
        }
      }, 100);
    return () => {
      clearInterval(interval);
    };
  });


  const toggle = (x, y) => {
    const [bytes, width, _] = weave;
    const value = bytes[y * width + x];
    const xx = y * width + x;
    bytes[y * width + x] = !value ? 1 : 0;
    heightBuffers.warpHeightBuffers[0][xx] = !value ? -1.0 : 1.0;
    heightBuffers.warpHeightBuffers[1][xx] = !value ? -1.0 : 1.0;
    heightBuffers.warpHeightBuffers[2][xx] = !value ? -1.0 : 1.0;
    heightBuffers.weftHeightBuffers[0][xx] = !value ? 1.0 : -1.0;
    heightBuffers.weftHeightBuffers[1][xx] = !value ? 1.0 : -1.0;
    heightBuffers.weftHeightBuffers[2][xx] = !value ? 1.0 : -1.0;
    setStep(0);
    return bytes;
  };

  return (
    <div className="App">
      <header className="App-header">
        <Weave3D currentHeightBuffer={step%3}  heightBuffers={heightBuffers}/>
        <div>{'...........'.substring(10 - (step/10)%10)}</div>
        <div>
          <button onClick={() => setGrid(!grid)}>grid</button>
        </div>
        <div>
          <button onClick={() => setZoom(Math.max(1, zoom - 1))}>-</button>
          <div>{zoom}</div>
          <button onClick={() => setZoom(Math.min(20, zoom + 1))}>+</button>
        </div>
        <SwitchWeave mode={'weave'} grid={grid} zoom={zoom} height={250} width={500}
                     weave={weave}
                     warp={warp} warpColors={colors} weft={weft} weftColors={colors}
                     currentHeightBuffer={step % 3} heightBuffers={heightBuffers}
                     toggle={toggle}/>
      </header>
    </div>
  );
};

export default App;
