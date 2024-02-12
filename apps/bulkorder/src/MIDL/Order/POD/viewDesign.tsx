/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Divider, Modal, Title } from '@mantine/core';
import React, { useState } from 'react';
import { PODType } from './types';
import { Layer, Stage, Text } from 'react-konva';
import { CMIObjectType } from 'cmi/src/CMI/hooks/designHooks.client';
import { ImagePreview } from '@admin/cmi';

type Props = {
  order: PODType;
};

export function ViewDesign({ order }: Props) {
  const [open, setOpen] = useState(false);
  const [stageRefs, setStageRefs] = useState<any[]>(
    // @ts-ignore
    Object.keys(order.design?.designs).map(() => React.createRef())
  );

  if (order.design)
    return (
      <div>
        <Button size="xs" variant="outline" onClick={() => setOpen(true)}>
          View Design
        </Button>
        <Modal onClose={() => setOpen(false)} opened={open}>
          <div className="grid gap-3 text-center w-full">
            {Object.keys(order.design.designs).map((sideName, index) => {
              const selectedSide =
                order.design?.selectedProduct.selectedColour.sides.find(
                  (s) => s.sideName === sideName
                );
              return (
                <div>
                  <div
                    className="mx-auto w-full"
                    style={{ width: selectedSide?.w }}
                  >
                    <Title className=" w-full" order={6}>
                      {sideName}
                    </Title>
                    <Stage
                      className="border border-dashed"
                      width={selectedSide?.w}
                      height={selectedSide?.h}
                      ref={stageRefs[index]}
                    >
                      <Layer>
                        {order.design?.designs[sideName].map((object) => {
                          switch (object.type) {
                            case 'image': {
                              const shapeProps: CMIObjectType = {
                                ...object,
                                x: object.x,
                                height: object.height,
                                y: object.y,
                                width: object.width,
                              };
                              return <ImagePreview obj={shapeProps} />;
                            }
                            case 'text': {
                              const shapeProps: CMIObjectType = {
                                ...object,
                                x: object.x,
                                y: object.y,
                                fontSize: object.fontSize,
                              };
                              return (
                                <Text
                                  x={shapeProps.x}
                                  y={shapeProps.y}
                                  text={shapeProps.text}
                                  fill={shapeProps.fill}
                                  fontSize={shapeProps.fontSize}
                                  fontFamily={`'${shapeProps.fontFamily}', sans-serif`}
                                  stroke={shapeProps.stroke}
                                  strokeWidth={shapeProps.strokeWidth}
                                  rotation={shapeProps.rotation}
                                  align={shapeProps.align}
                                  scaleY={shapeProps.flipY ? -1 : 1}
                                  reverse={shapeProps.flipX ? -1 : 1}
                                  name={shapeProps.id}
                                />
                              );
                            }
                          }
                        })}
                      </Layer>
                    </Stage>
                  </div>
                  <br />
                  <Button
                    onClick={async () => {
                      const image = await stageRefs[index].current.toDataURL({pixelRatio:10});
                      const link = document.createElement('a');
                      link.href = image;
                      link.download = `${sideName}.png`;
                      // Append the link to the body
                      document.body.appendChild(link);
                      // Trigger the download
                      link.click();
                      // Clean up
                      document.body.removeChild(link);
                      URL.revokeObjectURL(image);
                    }}
                  >
                    Download {sideName} design
                  </Button>
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
    );
}
