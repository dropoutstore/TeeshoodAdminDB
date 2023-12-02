/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { CMIObjectType, shapeProps } from '../../hooks/designHooks.client';
import { CMIImageComponent } from '../../Objects/image.client';
import { CMITextComponent } from '../../Objects/Text.client';
import { CMIReferenceTypes } from '.';
import { CMIHooksType } from '../../hooks';

type Props = {
  CMIHooks: CMIHooksType;
  scaleFactor: number;
  references: CMIReferenceTypes;
  onDragMove: () => void;
  setHLines: React.Dispatch<React.SetStateAction<any[]>>;
  setVLines: React.Dispatch<React.SetStateAction<any[]>>;
};

export function ObjectRender({ CMIHooks, scaleFactor, references }: Props) {
  const { designs, setSelectObject, selectedObject } = CMIHooks.designHooks;
  const { selectedSide } = CMIHooks.productHooks;
  const { shapeRef, trRef } = references;
  const onChange = (values: any) => {
    // const copyOfDesign = {...designs}
    // const targetSide = [...designs[selectedSide.sideName]];
    CMIHooks.designHooks.setSelectObject((t) => ({
      ...t,
      ...values,
      x: values.x - selectedSide.lm,
      y: values.y - selectedSide.tm,
    }));
    // targetSide.splice(index, 1, {
    //   ...targetSide[index],
    //   ...{
    //     ...values,
    //     x: values.x - selectedSide.lm,
    //     y: values.y - selectedSide.tm,
    //   },
    // });
    // CMIHooks.designHooks.setDesigns({
    //   ...designs,
    //   [selectedSide.sideName]: targetSide,
    // });
  };
  if (selectedSide && designs[selectedSide.sideName].length > 0) {
    return designs[selectedSide.sideName]?.map((object, index) => {
      if (object.type === 'image') {
        const shapeProps: CMIObjectType = {
          ...object,
          x: (object.x + selectedSide.lm) * scaleFactor,
          // @ts-ignore
          height: object.height * scaleFactor,
          y: (object.y + selectedSide.tm) * scaleFactor,
          width: object.width * scaleFactor,
        };
        return (
          <CMIImageComponent
            trRef={trRef}
            shapeRef={shapeRef.current[index]}
            key={object.id}
            onSelect={() => {
              CMIHooks.designHooks.setselectedRef(shapeRef.current[index]);
              setSelectObject(object);
            }}
            onChange={(values) => onChange(values)}
            isSelected={selectedObject?.id === object.id}
            src={object.src}
            shapeProps={shapeProps}
          />
        );
      } else if (object.type === 'text') {
        const shapeProps: CMIObjectType = {
          ...object,
          x: (object.x + selectedSide.lm) * scaleFactor,
          y: (object.y + selectedSide.tm) * scaleFactor,
          fontSize: object.fontSize * scaleFactor,
        };
        return (
          <CMITextComponent
            trRef={trRef}
            shapeRef={shapeRef.current[index]}
            key={object.id}
            onSelect={() => {
              CMIHooks.designHooks.setselectedRef(shapeRef.current[index]);
              setSelectObject(object);
            }}
            onChange={(values) => onChange(values)}
            isSelected={selectedObject?.id === object.id}
            shapeProps={shapeProps}
          />
        );
      } else return <></>;
    });
  } else return <></>;
}
