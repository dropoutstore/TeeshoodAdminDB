import { KonvaEventObject } from 'konva/lib/Node';
import React, { useRef, useState } from 'react';
import { SNAP_THRESHOLD, SNAP_LINE_STYLE } from '../../utils/snapGrids';
import { ObjectRender } from '../Center/objectRender';
import { CMIReferenceTypes } from '../Center';
import { CMIHooksType } from '../../hooks';
import { CircularXIcon } from '../../Objects/closeIcon';
import { CMIProductSide } from '@admin/meta';
import { CMIObjectType } from '../../hooks/designHooks.client';
import useImage from 'use-image';
import { Loader, Text } from '@mantine/core';
import { ImagePreview } from './image';
import {
  Group,
  Image,
  Layer,
  Line,
  Rect,
  Stage,
  Transformer,
  Text as KonvaText,
} from 'react-konva';
// import CMIImage from './objects/image.client';
type Props = {
  scaleFactor: number;
  objects: CMIObjectType[];
  selectedSide: CMIProductSide;
  stageRef: any;
};

export function Preview({
  selectedSide,
  objects,
  scaleFactor,
  stageRef,
}: Props) {
  const [img, loading] = useImage(selectedSide.image);
  const { h, lm, tm, w } = selectedSide;
  const height = h * scaleFactor;
  const width = w * scaleFactor;
  const left = lm * scaleFactor;
  const top = tm * scaleFactor;
  const containerWidth = 500 * scaleFactor;
  if (loading === 'loading') return <Loader />;
  else if (loading === 'failed') return <Text color="red">Error</Text>;
  return (
    <div
      style={{ width: containerWidth }}
      className={`relative w-[${(500 * scaleFactor).toString()}px] mx-auto`}
    >
      <div className={` z-10 relative`}>
        <Stage
          width={500 * scaleFactor}
          height={500 * scaleFactor}
          ref={stageRef}
        >
          <Layer>
            <Image
              image={img}
              x={0}
              y={0}
              width={500 * scaleFactor}
              height={500 * scaleFactor}
            />
          </Layer>
          <Layer>
            <Group
              clipFunc={(ctx: any) => {
                ctx.beginPath();
                ctx.moveTo(left, top);
                ctx.lineTo(left + width, top);
                ctx.quadraticCurveTo(left + width, top, left + width, top);
                ctx.lineTo(left + width, top + height);
                ctx.quadraticCurveTo(
                  left + width,
                  top + height,
                  left + width,
                  top + height
                );
                ctx.lineTo(left, top + height);
                ctx.quadraticCurveTo(left, top + height, left, top + height);
                ctx.lineTo(left, top);
                ctx.quadraticCurveTo(left, top, left, top);
                ctx.closePath();
              }}
            >
              {objects.map((object) => {
                switch (object.type) {
                  case 'image': {
                    const shapeProps: CMIObjectType = {
                      ...object,
                      x: (object.x + selectedSide.lm) * scaleFactor,
                      height: object.height * scaleFactor,
                      y: (object.y + selectedSide.tm) * scaleFactor,
                      width: object.width * scaleFactor,
                    };
                    return <ImagePreview obj={shapeProps} />;
                  }
                  case 'text': {
                    const shapeProps: CMIObjectType = {
                      ...object,
                      x: (object.x + selectedSide.lm) * scaleFactor,
                      y: (object.y + selectedSide.tm) * scaleFactor,
                      fontSize: object.fontSize * scaleFactor,
                    };
                    return (
                      <KonvaText
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
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
