/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Text } from 'react-konva';
import { useEffect } from 'react';
// import {withCMIObject} from './ObjectHOC.client';
import { CMIObjectType, shapeProps } from '../../CMI/hooks/designHooks.client';

type Props = {
  isSelected: boolean;
  onChange: (value: any) => void;
  onSelect: () => void;
  shapeProps: CMIObjectType;
  trRef: any;
  shapeRef: any;
};

export function CMITextComponent({
  isSelected,
  shapeRef,
  onChange,
  onSelect,
  shapeProps,
  trRef,
}: Props) {
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <Text
      onClick={onSelect}
      onTap={onSelect}
      ref={shapeRef}
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
      reverse={shapeProps.flipX? -1 : 1}
      draggable
      name="shape"
      onDragEnd={(e) => {
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y(),
          // @ts-ignore
          fontSize:e.target.fontSize()
        });
      }}
      onTransformEnd={(e) => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          ...shapeProps,
          x: node.x(),
          y: node.y(),
          // set minimal value
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY),
          fontSize: Math.max(node.fontSize() * scaleY),
        });
      }}
    />
  );
}
