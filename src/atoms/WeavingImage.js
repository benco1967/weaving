import React, {useRef, useEffect} from 'react';
import {drawWeaving} from "../drawing/drawWeaving";

const WeavingImage = ({grid, zoom, width, height, weave, warp, warpColors, weft, weftColors, toggle}) => {

  zoom = zoom || 4;
  const [bytes, weaveWidth, weaveHeight] = weave;
  const canvasRef = useRef(null);

  const onClick = e => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.x) / zoom) % weaveWidth;
    const y = Math.floor((e.clientY - rect.y) / zoom) % weaveHeight;
    toggle(x, y);
    const ctx = canvasRef.current.getContext('2d');
    drawWeaving(ctx, grid, zoom, width, height, bytes, weaveWidth, weaveHeight, warp, warpColors, weft, weftColors, x, y);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    drawWeaving(ctx, grid, zoom, width, height, bytes, weaveWidth, weaveHeight, warp, warpColors, weft, weftColors)

  }, [canvasRef, grid, zoom, width, height, bytes, weaveWidth, weaveHeight, warp, warpColors, weft, weftColors]);

  return (
    <canvas ref={canvasRef} width={width} height={height} onClick={onClick}/>
  );
};

export default WeavingImage;
