import React from 'react';

const defaultState = {
  image: undefined,
  status: 'loading'
};

const useSrcImage = (src, crossOrigin) => {
  const [{image, status}, setState] = React.useState(defaultState);

  React.useEffect(
    () => {
      if (!src) return;
      const img = document.createElement('img');

      const onLoad = () => {
        setState({ image: img, status: 'loaded' });
      };

      const onError = () => {
        setState({ image: undefined, status: 'failed' });
      };

      img.addEventListener('load', onLoad);
      img.addEventListener('error', onError);
      img.crossOrigin = crossOrigin || img.crossOrigin;
      img.src = src;

      return () => { // cleanup
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onError);
        setState(defaultState);
      };
    },
    [src, crossOrigin]
  );

  // return image and loading status
  return [image, status];
};

export default useSrcImage;