/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Image } from 'react-konva';
import { CMIObjectType } from '../../hooks/designHooks.client';
import useImage from 'use-image';

type Props = {
  obj: CMIObjectType;
};

export function ImagePreview({ obj }: Props) {
  // @ts-ignore
  const [img] = useImage(obj.src,'Anonymous');
  return (
    <Image
      image={img}
      scaleY={obj.flipY ? -1 : 1}
      scaleX={obj.flipX ? -1 : 1}
      x={obj.x}
      y={obj.y}
      width={obj.width}
      height={obj.height}
      rotation={obj.rotation}

    />
  );
}
