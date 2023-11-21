/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { productHookType } from '../../hooks/productHooks.client';
import { designHookType, shapeProps } from '../../hooks/designHooks.client';
import { CMIImageComponent } from '../../Objects/image.client';
import { CMITextComponent } from '../../Objects/Text.client';
import { CMIReferenceTypes } from '.';
import { Transformer } from 'react-konva';

type Props = {
  productHook: productHookType;
  designHooks: designHookType;
  scaleFactor: number;
  references: CMIReferenceTypes;
  onDragMove: () => void
  setHLines: React.Dispatch<React.SetStateAction<any[]>>
  setVLines: React.Dispatch<React.SetStateAction<any[]>>
};

export function ObjectRender({
  designHooks,
  productHook,
  scaleFactor,
  references,
  onDragMove,
  setHLines,
  setVLines
}: Props) {
  const { designs, setSelectObject, selectedObject } = designHooks;
  const { selectedSide } = productHook;
  const { shapeRef, trRef } = references;
  const onChange = (values: any, index: number) => {
    // const copyOfDesign = {...designs}
    const targetSide = [...designs[selectedSide.sideName]];
    targetSide.splice(index, 1, {
      ...targetSide[index],
      ...{
        ...values,
        x: values.x - selectedSide.lm,
        y: values.y - selectedSide.tm,
      },
    });
    designHooks.setDesigns({
        ...designs,
        [selectedSide.sideName]: targetSide,
      });
  };
  if (selectedSide && designs[selectedSide.sideName].length > 0) {
    return <>
    {designs[selectedSide.sideName]?.map((object, index) => {
      if (object.type === 'image') {
        const shapeProps: shapeProps = {
          ...object,
          x: (object.x + selectedSide.lm) * scaleFactor,
          // @ts-ignore
          height: object.height * scaleFactor,
          y: (object.y + selectedSide.tm) * scaleFactor,
          width: object.width * scaleFactor,
          rotation: object.rotation,
        };
        return (
          <CMIImageComponent
            trRef={trRef}
            shapeRef={shapeRef.current[index]}
            key={object.id}
            onSelect={() => setSelectObject(object)}
            onChange={(values) => onChange(values, index)}
            isSelected={selectedObject?.id === object.id}
            src={object.src}
            shapeProps={shapeProps}
          />
        );
      } else {
        const shapeProps: shapeProps = {
          ...object,
          x: (object.x + selectedSide.lm) * scaleFactor,
          y: (object.y + selectedSide.tm) * scaleFactor,
          rotation: object.rotation,
        };
        return (
          <CMITextComponent
            trRef={trRef}
            shapeRef={shapeRef.current[index]}
            key={object.id}
            onSelect={() => setSelectObject(object)}
            onChange={(values) => onChange(values, index)}
            isSelected={selectedObject?.id === object.id}
            shapeProps={shapeProps}
          />
        );
      }
    })}
    {Boolean(selectedObject) && (
              <Transformer
                ref={trRef}
                onDragMove={onDragMove}
                onDragEnd={() => {
                  setHLines([]);
                  setVLines([]);
                }}
                anchorCornerRadius={8}
                enabledAnchors={
                  selectedObject?.type === 'image'
                    ? ['top-left', 'top-right', 'bottom-left', 'bottom-right']
                    : ['middle-right', 'middle-left']
                }
                // anchorSize={25}
                rotateAnchorOffset={8}
                rotationSnaps={[
                  30, 45, 60, 90, 120, 135, 150, 180, 0, -30, -45, -60, -90,
                  -120, -135, -150,
                ]}
                boundBoxFunc={(oldBox, newBox) => {
                  // limit resize
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
    </>
  } else return <></>;
}
