import * as math from 'mathjs';

type Props = {
  width: number;
  height: number;
  reRange: NumberTuple,
  imRange: NumberTuple,
};

const diverges = (num: math.Complex) => {
  let current = num;

  for (let i = 0; i < 100; i++) {
    current = math.add(current, math.pow(current, 2)) as math.Complex;
    if (current.re + current.im > 16) {
      return true;
    }
  }
  return false;
};

type NumberTuple = [number, number];

type MapProps = {
  x: number;
  origin: NumberTuple;
  target: NumberTuple;
};

const map = ({ x, origin: [min, max], target: [newMin, newMax] }: MapProps) =>
  ((x - min) / (max - min)) * (newMax - newMin) + newMin;

const generateMandelbrot = ({ width, height, reRange, imRange }: Props) => {
  const mandelbrotSet: boolean[] = [];

  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      const re = map({ x: i, origin: [0, width], target: reRange});
      const im = map({ x: j, origin: [0, height], target: imRange});

      const z = math.complex(re, im);
      mandelbrotSet.push(diverges(z));
    }
  }

  return mandelbrotSet;
};

export { generateMandelbrot };
