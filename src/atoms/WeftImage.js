import React, {useRef, useEffect} from 'react';

const WeftImage = ({grid, zoom, height, width, weft, colors}) => {

  zoom = zoom || 4;
  const yarnCount = height / zoom;

  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    for (let y = 0; y < yarnCount; y++) {
      ctx.fillStyle = colors[weft[y % weft.length]];
      ctx.fillRect(0, y * zoom, width, zoom);
    }

    if(zoom > 4 && grid) {
      ctx.fillStyle = 'gray';
      for (let y=0; y < yarnCount; y++){
        ctx.fillRect(0,y*zoom, width, 1);
      }
    }
  }, [grid, zoom, yarnCount, weft, colors]);

  return (
    <canvas ref={canvasRef} height={height} width={width}/>
  );
};

export default WeftImage;
