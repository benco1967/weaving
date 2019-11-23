import React, {useState} from 'react';
import WarpImage from "../atoms/WarpImage";
import WeftImage from "../atoms/WeftImage";
import WeavingImage from "../atoms/WeavingImage";
import WeaveImage from "../atoms/WeaveImage";
import styled from 'styled-components';

const Styled = styled.table`
  div{
    display: block;
    margin: 0;
    width: 10px;
    height: 10px;
    background-color: ${props => props.mode ? 'black' : 'white'};
  }
`;

const SwitchWeave = ({grid, zoom, width, height, weave, warp, warpColors, weft, weftColors, toggle}) => {

  const [mode, setMode] = useState(false);
  zoom = zoom || 4;

  return (
    <Styled mode={mode}>
      <tbody>
      <tr>
        <td><WarpImage grid={grid} zoom={zoom} width={width} height={10} warp={warp} colors={warpColors}/></td>
        <td><div onClick={() => setMode(!mode)}/></td>
      </tr>
      <tr>
        <td>
          {mode ?
            (<WeaveImage grid={grid} zoom={zoom} height={height} width={width} weave={weave}
                         toggle={toggle}/>) :
            (<WeavingImage grid={grid} zoom={zoom} height={height} width={width} weave={weave}
                           warp={warp} warpColors={warpColors} weft={weft} weftColors={weftColors}
                           toggle={toggle}/>)}
        </td>
        <td><WeftImage grid={grid} zoom={zoom} width={10} height={height} weft={weft} colors={weftColors}/></td>
      </tr>
      </tbody>
    </Styled>
  );
};

export default SwitchWeave;


