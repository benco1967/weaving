import React from 'react';

const useInteractiveWeave = (offsetX, offsetY, defaultWeave, zoom) => {
  const [weave, setWeave] = React.useState(defaultWeave);

  const [bytes, width, height] = weave;

  const onClick = e => {
    e.preventDefault();
    const x = Math.floor(e.clientX / zoom) % width;
    const y = Math.floor(e.clientY / zoom) % height;
    console.log(e.clientX);
    console.log(e.clientY);
    console.log(e.target.offsetLeft)
    console.log(e.target.offsetTop)
    console.log(e.clientX - e.target.offsetLeft)
    console.log(e.clientY - e.target.offsetTop)
    console.log(x);
    console.log(y);
  };

  return [weave, onClick];
};

export default useInteractiveWeave;