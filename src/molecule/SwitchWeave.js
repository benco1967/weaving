import React, {useState} from 'react';
import WarpImage from "../atoms/WarpImage";
import WeftImage from "../atoms/WeftImage";
import WeavingImage from "../atoms/WeavingImage";
import WeaveImage from "../atoms/WeaveImage";
import styled from 'styled-components';
import WeftCuttingPlane from "../atoms/WeftCuttingPlane";
import WarpCuttingPlane from "../atoms/WarpCuttingPlane";

const Styled = styled.table`
  div{
    display: block;
    margin: 0;
    width: 10px;
    height: 10px;
    background-color: ${props => props.mode ? 'black' : 'white'};
  }
`;

const SwitchWeave = ({grid, zoom, width, height, weave, warpYarns, warpColors, weftYarns, weftColors, physical, toggle}) => {

  const [mode, setMode] = useState(false);
  const [cuttingPlaneX, setCuttingPlaneX] = useState(0);
  const [cuttingPlaneY, setCuttingPlaneY] = useState(0);

  zoom = zoom || 4;

  return (
    <Styled mode={mode}>
      <tbody>
      <tr>
        <td><WarpImage grid={grid} zoom={zoom} width={width} height={10} yarns={warpYarns} colors={warpColors}/></td>
        <td></td>
        <td>
          <div onClick={() => setMode(!mode)}/>
        </td>
      </tr>
      <tr>
        <td><WarpCuttingPlane zoom={zoom} width={width} planeX={cuttingPlaneX} planeY={cuttingPlaneY}
                              physical={physical} setCuttingPlane={setCuttingPlaneX}/></td>
      </tr>
      <tr>
        <td>
          {mode ?
            (<WeaveImage grid={grid} zoom={zoom} height={height} width={width} weave={weave}
                         toggle={toggle}/>) :
            (<WeavingImage grid={grid} zoom={zoom} height={height} width={width} weave={weave}
                           warpYarns={warpYarns} warpColors={warpColors} weftYarns={weftYarns} weftColors={weftColors}
                           toggle={toggle}/>)}
        </td>
        <td><WeftCuttingPlane zoom={zoom} height={height} planeX={cuttingPlaneX} planeY={cuttingPlaneY}
                              physical={physical} setCuttingPlane={setCuttingPlaneY}/></td>
        <td><WeftImage grid={grid} zoom={zoom} width={10} height={height} yarns={weftYarns} colors={weftColors}/></td>
      </tr>
      </tbody>
    </Styled>
  );
};

export default SwitchWeave;


