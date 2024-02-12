import { Circle, Line } from 'react-konva';

export const CircularXIcon = ({ x, y }: { x: number; y: number }) => {
  const size = 20;
  const radius = size / 2;
  const lineLength = size * 0.6; // Length of each line in the X
  const offset = (size - lineLength) / 2;

  return (
    <>
      <Circle x={x} y={y} radius={radius} fill={'red'} />
      <Line
        x={x - radius}
        y={y - radius}
        points={[offset, offset, lineLength + offset, lineLength + offset]}
        stroke={'white'}
        strokeWidth={2}
        lineCap="round"
      />
      <Line
        x={x - radius}
        y={y - radius}
        points={[lineLength + offset, offset, offset, lineLength + offset]}
        stroke={'white'}
        strokeWidth={2}
        lineCap="round"
      />
    </>
  );
};
