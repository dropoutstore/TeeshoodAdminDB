import {Text} from 'react-konva';
import {useEffect} from 'react';
// import {withCMIObject} from './ObjectHOC.client';
import {shapeProps} from '../../CMI/hooks/designHooks.client';

type Props = {
  isSelected: boolean;
  onChange: (value: any) => void;
  onSelect: () => void;
  shapeProps: shapeProps;
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
  console.log("shapeProps",shapeProps);
  
  return (
    <Text

        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        // x={100}
        // y={100}
        // text="sdjcvbs"
        // fill='#0000ff'
        // fontSize={20}
        // fontFamily='"Epilouge", sans-serif'
        {...shapeProps}
        scaleY={shapeProps.flipY ? -1 : 1}
        scaleX={shapeProps.flipX ? -1 : 1}
        draggable
        name="shape"
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
          });
        }}
      />
  );
}
