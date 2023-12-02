/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { ColorInput, NumberInput, Button } from '@mantine/core';

export const ImageBGRemover = ({ imageUrl }: { imageUrl: string }) => {
  const [image] = useImage(imageUrl);
  const [selectedColor, setSelectedColor] = useState('');
  const [tolerance, setTolerance] = useState(10);
  const [colorsToRemove, setColorsToRemove] = useState<
    { color: string; tolerance: number }[]
  >([]);

  const handleStageMouseDown = (event: any) => {
    // Detect the color of the clicked pixel
    const clickedColor = ''; // You need to implement color detection logic
    setSelectedColor(clickedColor);
  };

  const addColorToRemove = () => {
    if (selectedColor) {
      setColorsToRemove([
        ...colorsToRemove,
        { color: selectedColor, tolerance },
      ]);
    }
  };

  const applyRemoval = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!image) return;
    canvas.width = image.width;
    canvas.height = image.height;
    context?.drawImage(image, 0, 0);

    const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData?.data;
    if (!data) return;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      colorsToRemove.forEach(({ color, tolerance }) => {
        if (isColorWithinTolerance(r, g, b, color, tolerance)) {
          data[i + 3] = 0; // Set alpha to 0 to make the pixel transparent
        }
      });
    }

    context?.putImageData(imageData, 0, 0);

    const updatedImage = new window.Image();
    updatedImage.src = canvas.toDataURL();
    updatedImage.onload = () => {
      // Replace the old image with the new one
      // This will trigger a re-render
      console.log(updatedImage);
    };
  };

  const isColorWithinTolerance = (
    r: number,
    g: number,
    b: number,
    color: string,
    tolerance: number
  ) => {
    const target = hexToRgb(color);
    return (
      // @ts-ignore
      Math.abs(r - target.r) <= tolerance &&
      // @ts-ignore
      Math.abs(g - target.g) <= tolerance &&
      // @ts-ignore
      Math.abs(b - target.b) <= tolerance
    );
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleStageMouseDown}
      >
        <Layer>
          <KonvaImage image={image} />
          {/* Additional elements if needed */}
        </Layer>
      </Stage>
      <div>
        <ColorInput
          value={selectedColor}
          onChange={setSelectedColor}
          placeholder="Select color"
        />
        <NumberInput
          value={tolerance}
          min={1}
          max={128}
          onChange={(t: number) => setTolerance(t)}
          placeholder="Tolerance"
        />
        <Button onClick={addColorToRemove}>Add Color to Remove</Button>
        <Button onClick={applyRemoval}>Remove Colors</Button>
      </div>
    </div>
  );
};
