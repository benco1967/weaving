import React, {useRef, useEffect} from 'react';
import {drawWeave} from "../drawing/drawWeave";


const WeaveImage = ({grid, zoom, width, height, weave, toggle}) => {

  zoom = zoom || 4;
  const canvasRef = useRef(null);
  const [bytes, weaveWidth, weaveHeight] = weave;

  const onClick = e => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.x) / zoom) % weaveWidth;
    const y = Math.floor((e.clientY - rect.y) / zoom) % weaveHeight;
    toggle(x, y);
    const ctx = canvasRef.current.getContext('2d');
    drawWeave(ctx, grid, zoom, width, height, bytes, weaveWidth, weaveHeight, x, y);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawWeave(ctx, grid, zoom, width, height, bytes, weaveWidth, weaveHeight);
  }, [canvasRef, grid, zoom, width, height, bytes, weaveWidth, weaveHeight]);

  return (
    <canvas ref={canvasRef} width={width} height={height} onClick={onClick}/>
  );
};

export default WeaveImage;
