import React, {useRef, useEffect} from 'react';

const Image = ({grid, zoom, width, height, drawingFn}) => {

  zoom = zoom || 4;
  width = width || 1;
  height = height || 1;
  const realWidth = width * zoom;
  const realHeight = height * zoom;

  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawingFn(ctx, zoom, width, height);

    if(zoom > 4 && grid) {
      ctx.fillStyle = 'gray';
      for (let x=0; x < width; x++){
        ctx.fillRect(x*zoom, 0, 1, realHeight);
      }
      for (let y=0; y < height; y++){
        ctx.fillRect(0,y*zoom, realWidth, 1);
      }
    }
  }, [grid, zoom, width, height,realWidth, realHeight, drawingFn]);

  return (
    <canvas ref={canvasRef} width={realWidth} height={realHeight}/>
  );
};

export default Image;
