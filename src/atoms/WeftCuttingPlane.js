import React, {useRef, useEffect} from 'react';

const RADIUS = 0.4;

const drawClearBackGround = (ctx, zoom, height) => {
  const width = zoom * 4;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
};
const drawWeft = (ctx, zoom, height, planeX, physical) => {
  const {weftHeight, weaveWidth, weaveHeight} = physical;
  const plane = planeX % weaveWidth;
  const radius = RADIUS * zoom;
  const halfZoom = zoom * 0.5;
  const weavingHeight = height / zoom;

  ctx.lineWidth = radius * 2;
  ctx.strokeStyle = 'gray';
  ctx.beginPath();
  let xPrev = (2 - weftHeight[plane]) * zoom;
  let yPrev = halfZoom;
  ctx.moveTo(xPrev, yPrev);
  for (let y = 1; y < weavingHeight; y++) {
    const xx = plane + (y % weaveHeight) * weaveWidth;
    const xCurrent = (2 - weftHeight[xx]) * zoom;
    const yCurrent = y * zoom + halfZoom
    ctx.bezierCurveTo(xPrev, yPrev + halfZoom, xCurrent, yCurrent - halfZoom, xCurrent, yCurrent);
    xPrev = xCurrent;
    yPrev = yCurrent;
  }
  ctx.stroke();
};

const drawWarp = (ctx, zoom, height, planeX, physical) => {
  const TWO_PI = 2 * Math.PI;
  const {warpHeight, weaveWidth, weaveHeight} = physical;
  const plane = planeX % weaveWidth;
  const radius = RADIUS * zoom;
  const halfZoom = zoom * 0.5;
  const weavingHeight = height / zoom;

  for (let y = 0; y < weavingHeight; y++) {
    const xx = plane % weaveWidth + (y % weaveHeight) * weaveWidth;
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.ellipse((2 - warpHeight[xx]) * zoom, y * zoom + halfZoom, radius, radius, 0, 0, TWO_PI);
    ctx.closePath();
    ctx.fill();
  }
};

const drawCuttingPlane = (ctx, zoom, height, planeY) => {
  const halfZoom = zoom * 0.5;
  const width = zoom * 4;

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  const posPlane = halfZoom + planeY * zoom;
  ctx.moveTo(0, posPlane);
  ctx.lineTo(width, posPlane);
  ctx.stroke();
};

const WeftCuttingPlane = ({zoom, height, planeX, planeY, physical, setCuttingPlane}) => {
  const canvasRef = useRef(null);

  const onClick = e => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const y = Math.floor((e.clientY - rect.y) / zoom);
    setCuttingPlane(y);
  };

  useEffect(() => {
      if (!physical) return;

      const interval = setInterval(
        () => {
          if (physical.status === 'computing') {
            const ctx = canvasRef.current.getContext('2d');
            drawClearBackGround(ctx, zoom, height);
            drawWeft(ctx, zoom, height, planeX, physical);
            drawWarp(ctx, zoom, height, planeX, physical);
            drawCuttingPlane(ctx, zoom, height, planeY);
          }
        }, 100);
      return () => {
        clearInterval(interval);
      };
    }
  );

  const width = zoom * 4;
  return (
    <canvas ref={canvasRef} width={width} height={height} onClick={onClick}/>
  );
};

export default WeftCuttingPlane;
