/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DesignArea } from './DesignArea.client';
import { SidePick } from '../CMI/UI/Center/sidePick.client';
import { useProductHooks } from './hooks/productHooks.client';
import { CMIImageComponent } from './objects/image.client';
import {
  CMIObjectType,
  CMISideDesignType,
  shapeProps,
  useDesignHooks,
} from '../CMI/hooks/designHooks.client';
import { LeftMenu } from './LeftMenu/index.client';
import React, { useEffect, useState } from 'react';
// import { Transformer } from 'react-konva';
import { CMIProductSide, CMIproductType } from '@admin/meta';
import { CMITextComponent } from './objects/Text.client';
// import CMIImageComponent from './objects/image.client';

export function CMIWrapper({product}:{product:CMIproductType}) {
  const {
    selectedColour,
    selectedSide,
    setSelectedSide,
    setSelectedProduct,
    setSelectedColour,
    selectedProduct,
  } = useProductHooks(product);
  const {
    selectedObject,
    designs,
    setDesigns,
    setSelectObject,
    loading,
    setLoading,
  } = useDesignHooks();
  if (typeof window === 'undefined') {
    throw Error('Designer should only render on the client.');
  }
  const [scaleFactor, setScaleFactor] = useState(1);
  useEffect(() => {
    const newDes: CMISideDesignType = {};
    selectedProduct.colours[0].sides.forEach((val) => {
      newDes[val.sideName] = [];
    });
    setDesigns(newDes);
  }, [selectedProduct]);
  return (
    <div className="flex">
      <LeftMenu
        setSelectedColor={(color) => setSelectedColour(color)}
        selectObject={(obj: CMIObjectType) => setSelectObject(obj)}
        selectedSide={selectedSide}
        onChange={(newObj, resetLoad) => {
          const copy = { ...designs };
          const target = copy[selectedSide.sideName];
          const targetIndex = target.findIndex((t) => t.id === newObj.id);
          target.splice(targetIndex, 1, {
            ...newObj,
            x: newObj.x - selectedSide.lm,
            y: newObj.y - selectedSide.tm,
          });
          copy[selectedSide.sideName] = target;
          setDesigns(copy);
          if (resetLoad) setLoading(true);
        }}
        selectedObject={selectedObject}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        selectedDesigns={designs[selectedSide.sideName]}
        addObject={(obj) => {
          const target = { ...designs };
          target[selectedSide.sideName] = [
            ...target[selectedSide.sideName],
            obj,
          ];
          setDesigns(target);
          setLoading(true);
        }}
        setSelectedDesigns={(newDes) => {
          setDesigns(() => {
            const target = { ...designs };
            target[selectedSide.sideName] = newDes;
            return target;
          });
          setLoading(true);
        }}
      />
      <div className="w-full ">
        {!loading ? (
          <CMI
            selectedObject={selectedObject}
            setDesigns={setDesigns}
            setSelectObject={setSelectObject}
            selectedSide={selectedSide}
            scaleFactor={scaleFactor}
            designs={designs}
          />
        ) : (
          <div
            className={`mx-auto`}
            style={{
              width: 500 * scaleFactor,
              height: 500 * scaleFactor,
            }}
          />
        )}

        <SidePick
          sides={selectedColour.sides}
          setSelectedSide={setSelectedSide}
          selectedSide={selectedSide}
        />
      </div>
    </div>
  );
}

export const CMI = ({
  setSelectObject,
  designs,
  scaleFactor,
  selectedSide,
  setDesigns,
  selectedObject,
}: {
  setSelectObject: React.Dispatch<React.SetStateAction<CMIObjectType | null>>;
  selectedSide: CMIProductSide;
  scaleFactor: number;
  designs: CMISideDesignType;
  setDesigns: React.Dispatch<React.SetStateAction<CMISideDesignType>>;
  selectedObject: CMIObjectType | null;
}) => {
  const shapeRef = React.useRef<any>(
    designs[selectedSide.sideName].map(() => React.createRef())
  );
  const trRef = React.useRef<any>();
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
    // const remaning = designs[selectedSide.sideName].filter(des=>des.id!==design.id)
    setDesigns({
      ...designs,
      [selectedSide.sideName]: targetSide,
    });
  };

  return (
    <DesignArea
      deselect={() => setSelectObject(null)}
      selectedSide={selectedSide}
      scaleFactor={scaleFactor}
      selectedObject={selectedObject}
      trRef={trRef}
    >
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
    </DesignArea>
  );
};
