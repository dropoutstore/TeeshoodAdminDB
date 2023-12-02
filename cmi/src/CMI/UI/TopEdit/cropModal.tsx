import { Button, LoadingOverlay, Modal } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage, Transformer } from 'react-konva';
import { resizeDimensions } from '../../utils/resizeImageinsideBox';

type Props = {
  imageSrc: string;
  closeModal: () => void;
  setImageFunc: (image: string) => void;
  imgShape: { width: number; height: number };
};

export function CropModal({
  closeModal,
  imageSrc,
  setImageFunc,
  imgShape,
}: Props) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [selectedShape, setSelectedShape] = useState<any>(null);
  const [stageConfig, setStageConfig] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const [cropConfig, setCropConfig] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const transformerRef = useRef<any>();
  const stageRef = useRef<any>();
  useEffect(() => {
    const img = new window.Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imageSrc;
    img.onload = () => {
      const stageShape = resizeDimensions(
        800,
        800,
        imgShape.width,
        imgShape.height
      );
      setStageConfig(stageShape);
      setCropConfig((t) => ({ ...t, ...stageShape }));
      setLoading(false);
      setImage(img);
    };
    return () => {
      setImage(null);
    };
  }, [imageSrc]);
  const handleCrop = async () => {
    setSelectedShape(null);
    setTimeout(async () => {
      const croppedImage = await stageRef.current.toDataURL(cropConfig);
      setImageFunc(croppedImage);
      closeModal();
      setImage(null);
    }, 50);
  };
  useEffect(() => {
    if (selectedShape) {
      transformerRef.current.nodes([selectedShape]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedShape]);
  if (loading) return <LoadingOverlay visible />;
  return (
    <Modal fullScreen opened={Boolean(imageSrc)} onClose={() => closeModal()}>
      <div className="mx-auto text-center" style={stageConfig}>
        <Stage ref={stageRef} {...stageConfig}>
          <Layer>
            {image && <Image image={image} {...stageConfig} />}
            <Rect
              {...cropConfig}
              fill="rgba(0,0,0,0.3)"
              draggable
              onDragEnd={(e) => {
                setCropConfig({
                  ...cropConfig,
                  x: e.target.x(),
                  y: e.target.y(),
                });
              }}
              onTransformEnd={() => {
                const node = selectedShape;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                setCropConfig({
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(node.height() * scaleY, 5),
                });
              }}
              onClick={(e) => setSelectedShape(e.target)}
            />
            {selectedShape && (
              <Transformer
                ref={transformerRef}
                rotateEnabled={false}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>
        <br />
        <Button onClick={handleCrop}>Crop Image</Button>
        <br />
        <br />
      </div>
    </Modal>
  );
}
