import React, {useRef, useEffect, useState} from 'react';
import {drawWeaving} from "../drawing/drawWeaving";

const WarpCuttingPlane = ({zoom, width, planeX, planeY, warpWeftHeight, setCuttingPlane}) => {

    const [warpHeight, weftHeight, weaveWidth, weaveHeight] = warpWeftHeight;
    const height = zoom * 4;
    const halfZoom = zoom * 0.5;
    const TWO_PI = 2 * Math.PI;
    const weavingWidth = width / zoom;

    const canvasRef = useRef(null);

    const onClick = e => {
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.x) / zoom);
      setCuttingPlane(x);
    };

    useEffect(() => {
      const ctx = canvasRef.current.getContext('2d');

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);
      for (let x = 0; x < weavingWidth; x++) {
        const xx = x % weaveWidth + planeY * weaveWidth;
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.ellipse(x * zoom + halfZoom, (2 + weftHeight[xx]) * zoom, halfZoom, halfZoom, 0, 0, TWO_PI);
        ctx.closePath();
        ctx.fill();
      }

      ctx.lineWidth = zoom / 2;
      ctx.strokeStyle = 'gray';
      ctx.beginPath();
      const plane = planeY % weaveHeight;
      let xPrev = halfZoom;
      let yPrev = (2 + warpHeight[plane]) * zoom;
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

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      const posPlane = halfZoom + planeX * zoom;
      ctx.moveTo(posPlane, 0);
      ctx.lineTo(posPlane, height);
      ctx.stroke();

    });

    return (
      <canvas ref={canvasRef} width={width} height={height} onClick={onClick}/>
    );
  }
;

export default WarpCuttingPlane;
