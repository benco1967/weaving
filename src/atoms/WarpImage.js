import React, {useRef, useEffect} from 'react';

const WarpImage = ({grid, zoom, width, height, yarns, colors}) => {

  zoom = zoom || 4;
  const yarnCount = width / zoom;

  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    for (let x = 0; x < yarnCount; x++) {
      ctx.fillStyle = colors[yarns[x % yarns.length]];
      ctx.fillRect(x * zoom, 0, zoom, height);
    }

    if(zoom > 4 && grid) {
      ctx.fillStyle = 'gray';
      for (let x=0; x < yarnCount; x++){
        ctx.fillRect(x*zoom, 0, 1, height);
      }
    }
  }, [grid, zoom, yarnCount, yarns, colors]);

  return (
    <canvas ref={canvasRef} width={width} height={height}/>
  );
};

export default WarpImage;
