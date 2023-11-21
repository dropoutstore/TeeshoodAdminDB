import useImage from 'use-image';
import {Image, Transformer} from 'react-konva';
import {useEffect, useRef, useState} from 'react';
// import {withCMIObject} from './ObjectHOC.client';
import {shapeProps} from '../../CMI/hooks/designHooks.client';

type Props = {
  src: string;
  isSelected: boolean;
  onChange: (value: any) => void;
  onSelect: () => void;
  shapeProps: shapeProps;
  trRef: any;
  shapeRef: any;
};

export function CMIImageComponent({
  src,
  isSelected,
  shapeRef,
  onChange,
  // type = 'image',
  onSelect,
  shapeProps,
  trRef,
}: Props) {
  const [image] = useImage(src);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  if (image)
    return (
      <>
        <Image
          image={image}
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          scaleY={shapeProps.flipY ? -1 : 1}
          scaleX={shapeProps.flipX ? -1 : 1}
          draggable
          name="shape"
          onTransformEnd={(e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
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
            });
          }}
        />
        {/* {isSelected && (
                  <Transformer
                    ref={trRef}
                    enabledAnchors={[
                      'top-left',
                      'top-right',
                      'bottom-left',
                      'bottom-right',
                    ]}
                    rotationSnaps={[90, 45, 180, 135, 0, -45, -90, -135]}
                    boundBoxFunc={(oldBox, newBox) => {
                      // limit resize
                      if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                )} */}
      </>
    );
  return <></>;
}

// export const CMIImage = withCMIObject(CMIImageComponent);
