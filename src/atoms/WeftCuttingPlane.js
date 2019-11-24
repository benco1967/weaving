import React, {useRef, useEffect} from 'react';

const WeftCuttingPlane = ({zoom, height, planeX, planeY, warpWeftHeight, setCuttingPlane}) => {

    const [warpHeight, weftHeight, weaveWidth, weaveHeight] = warpWeftHeight;
    const width = zoom * 4;
    const halfZoom = zoom * 0.5;
    const TWO_PI = 2 * Math.PI;
    const weavingHeight = height / zoom;

    const onClick = e => {
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const y = Math.floor((e.clientY - rect.y) / zoom);
      setCuttingPlane(y);
    };

    const canvasRef = useRef(null);

    useEffect(() => {
      const ctx = canvasRef.current.getContext('2d');

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'black';
      const plane = planeX % weaveWidth;
      for (let y = 0; y < weavingHeight; y++) {
        const xx = plane % weaveWidth + (y % weaveHeight) * weaveWidth;
        ctx.beginPath();
        ctx.ellipse((2 - warpHeight[xx]) * zoom, y * zoom + halfZoom, halfZoom, halfZoom, 0, 0, TWO_PI);
        ctx.closePath();
        ctx.fill();
      }

      ctx.lineWidth = zoom / 2;
      ctx.strokeStyle = 'gray';
      ctx.beginPath();
      let xPrev = (2 - weftHeight[plane]) * zoom;
      let yPrev = halfZoom;
      ctx.moveTo(xPrev, yPrev);
      for (let y = 1; y < weavingHeight; y++) {
        const xx = plane + (y % weaveHeight) * weaveWidth;
        const xCurrent = (2 - weftHeight[xx]) * zoom;
        const yCurrent = y * zoom + halfZoom;
        ctx.bezierCurveTo(xPrev, yPrev + halfZoom, xCurrent, yCurrent - halfZoom, xCurrent, yCurrent);
        xPrev = xCurrent;
        yPrev = yCurrent;
      }
      ctx.stroke();

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      const posPlane = halfZoom + planeY * zoom;
      ctx.moveTo(0, posPlane);
      ctx.lineTo(width, posPlane);
      ctx.stroke();
    });

    return (
      <canvas ref={canvasRef} width={width} height={height} onClick={onClick}/>
    );
  }
;

export default WeftCuttingPlane;
