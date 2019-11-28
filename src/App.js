import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import {getTwillWeave} from "./weaving/twill";
import {getBraidedWeave} from "./weaving/braided";
import {getPlainWeave} from "./weaving/plain";
import SwitchWeave from "./molecule/SwitchWeave";
import {PhysicalWeave} from "./weaving/physicalSimulation";
import {getEmbossedWeave} from "./weaving/embossed";
import Weave3D from "./3d/Weave3D";

const colors = ['blue', 'green', 'yellow', 'orange', 'red', 'magenta', 'white', 'black'];
const warp = [2];
const weft = [3];

const weave =
//getPlainWeave();
  getEmbossedWeave();
//getTwillWeave('3 3');
//getBraidedWeave('3 3', '4 4');

const App = () => {
  const [zoom, setZoom] = useState(8);
  const [grid, setGrid] = useState(true);

  const [physical, setPhysical] = useState(new PhysicalWeave(weave));

  const toggle = (x, y) => {
    const [bytes, width, _] = weave;
    const knot = bytes[y * width + x] === 0 ? 1 : 0;
    const xx = y * width + x;
    bytes[xx] = knot;
    physical.toggle(x, y, knot);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Weave3D physical={physical}/>
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
                     physical={physical}
                     toggle={toggle}/>
      </header>
    </div>
  );
};

export default App;
