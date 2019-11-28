import React, {useRef, useEffect, useState} from 'react';

const RADIUS = 0.4;

const drawClearBackGround = (ctx, zoom, width) => {
  const height = zoom * 4;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
};
const drawWarp = (ctx, zoom, width, planeY, physical) => {
  const {warpHeight, weaveWidth, weaveHeight} = physical;
  const plane = planeY % weaveHeight;
  const radius = RADIUS * zoom;
  const halfZoom = zoom * 0.5;
  const weavingWidth = width / zoom;

  ctx.lineWidth = radius * 2;
  ctx.strokeStyle = 'gray';
  ctx.beginPath();
  let xPrev = halfZoom;
  let yPrev = (2 + warpHeight[plane * weaveWidth]) * zoom;
  ctx.moveTo(xPrev, yPrev);
  for (let x = 1; x < weavingWidth; x++) {
    const xx = x % weaveWidth + plane * weaveWidth;
    const xCurrent = x * zoom + halfZoom;
    const yCurrent = (2 + warpHeight[xx]) * zoom;
    ctx.bezierCurveTo(xPrev + halfZoom, yPrev, xCurrent - halfZoom, yCurrent, xCurrent, yCurrent);
    xPrev = xCurrent;
    yPrev = yCurrent;
  }
  ctx.stroke();
};

const drawWeft = (ctx, zoom, width, planeY, physical) => {
  const TWO_PI = 2 * Math.PI;
  const {weftHeight, weaveWidth, weaveHeight} = physical;
  const plane = planeY % weaveHeight;
  const radius = RADIUS * zoom;
  const halfZoom = zoom * 0.5;
  const weavingWidth = width / zoom;

  for (let x = 0; x < weavingWidth; x++) {
    const xx = x % weaveWidth + plane * weaveWidth;
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.ellipse(x * zoom + halfZoom, (2 + weftHeight[xx]) * zoom, radius, radius, 0, 0, TWO_PI);
    ctx.closePath();
    ctx.fill();
  }
};

const drawCuttingPlane = (ctx, zoom, width, planeX) => {
  const halfZoom = zoom * 0.5;
  const height = zoom * 4;

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  const posPlane = halfZoom + planeX * zoom;
  ctx.moveTo(posPlane, 0);
  ctx.lineTo(posPlane, height);
  ctx.stroke();
};

const WarpCuttingPlane = ({zoom, width, planeX, planeY, physical, setCuttingPlane}) => {
  const canvasRef = useRef(null);

  const onClick = e => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.x) / zoom);
    setCuttingPlane(x);
  };

  useEffect(() => {
      if (!physical) return;

      const interval = setInterval(
        () => {
          if (physical.status === 'computing') {
            const ctx = canvasRef.current.getContext('2d');
            drawClearBackGround(ctx, zoom, width);
            drawWarp(ctx, zoom, width, planeY, physical);
            drawWeft(ctx, zoom, width, planeY, physical);
            drawCuttingPlane(ctx, zoom, width, planeX);
          }
        }, 100);
      return () => {
        clearInterval(interval);
      };
    }
  );

  const height = zoom * 4;
  return (
    <canvas ref={canvasRef} width={width} height={height} onClick={onClick}/>
  );
};

export default WarpCuttingPlane;
