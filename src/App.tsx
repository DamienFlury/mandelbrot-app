import React, { useRef, useEffect } from 'react';
import './App.css';
import { generateMandelbrot } from './functions/mandelbrot';

const App = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const width = 400;
  const height = 400;
  const mandelbrotSet = generateMandelbrot({ width, height, x: -2, y: -2});
  // console.log(mandelbrotSet);
  useEffect(() => {
    const canv = ref.current;
    if(!canv) { return; }
    const context = canv.getContext('2d');
    if(!context) { return; }
    const imageData = context.createImageData(width, height);
    imageData.data.set(mandelbrotSet.flatMap(x => x ? [0, 0, 0, 255] : [255, 255, 255, 255]));
    context.putImageData(imageData, 5, 5);
    // for(let i = 0; i < width; i += 5) {
    //   for(let j = 0; j < height; j += 5) {

    //     // console.log(i * width + j)
    //     if(mandelbrotSet[i * width + j]) {
    //       context.rect(j, i, 5, 5);
    //       context.fill();
    //     }
    //   }
    // }
  }, [mandelbrotSet]);
  return (
    <canvas width={width} height={height} style={{background: 'white'}} ref={ref} />
  );
}

export default App;
