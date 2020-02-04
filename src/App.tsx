import React, { useRef, useEffect } from 'react';
import './App.css';
import { generateMandelbrot } from './functions/mandelbrot';

const App = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const width = 500;
  const height = 500;
  const mandelbrotSet = generateMandelbrot({
    width,
    height,
    reRange: [-1.75, 0.75],
    imRange: [-1.25, 1.25],
  });
  console.log('Mandelbrot generated... Drawing...')
  // console.log(mandelbrotSet);
  useEffect(() => {
    const canv = ref.current;
    if (!canv) {
      return;
    }
    const context = canv.getContext('2d');
    if (!context) {
      return;
    }
    const imageData = context.createImageData(width, height);
    imageData.data.set(
      mandelbrotSet.flatMap(x => (x ? [0, 0, 0, 255] : [255, 255, 255, 255]))
    );
    context.putImageData(imageData, 5, 5);
  }, [mandelbrotSet]);
  return (
    <canvas
      width={width}
      height={height}
      style={{ background: 'white' }}
      ref={ref}
    />
  );
};

export default App;
