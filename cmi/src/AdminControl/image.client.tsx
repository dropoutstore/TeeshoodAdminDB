import useImage from 'use-image';
import { Image, Transformer } from 'react-konva';
import { useEffect, useRef, useState } from 'react';
// import {withCMIObject} from './ObjectHOC.client';

type Props = {
  src: string;
  flip: boolean | undefined;
};

export function CMIImageComponent({ src, flip }: Props) {
  const [image] = useImage(src);

  if (image)
    return (
      <Image image={image} scaleX={flip?-1:1} x={0} y={0} width={500} height={500} />
    );
  return <></>;
}

// export const CMIImage = withCMIObject(CMIImageComponent);
