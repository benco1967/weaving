import React, {useState} from 'react';
import './App.css';
import {getTwillWeave} from "./weaving/twill";
import SwitchWeave from "./molecule/SwitchWeave";
import {computeHeight} from "./weaving/physicalSimulation";
import {getEmbossedWeave} from "./weaving/embossed";
import WeftCuttingPlane from "./atoms/WeftCuttingPlane";
import {getBraidedWeave} from "./weaving/braided";

const colors = ['blue', 'green', 'yellow', 'orange', 'red', 'magenta', 'white', 'black'];
const warp = [2];
const weft = [3];

const weave =
  getEmbossedWeave();
//getTwillWeave('3 3');
//getBraidedWeave('3 3', '4 4');

const warpWeftHeight = computeHeight(weave);
const toggle = (x, y) => {
  const [bytes, width, height] = weave;
  const value = bytes[y * width + x];
  bytes[y * width + x] = !value ? 1 : 0;
  return bytes;
};

const App = () => {
  const [zoom, setZoom] = useState(8);
  const [grid, setGrid] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
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
                     warpWeftHeight={warpWeftHeight}
                     toggle={toggle}/>
      </header>
    </div>
  );
};

export default App;
