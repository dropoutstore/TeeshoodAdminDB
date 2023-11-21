import React from 'react';
import {leftTabType} from '../../CMI/hooks/leftTabHooks.client';
import {LayerEditor} from './Layers/Layer.editor.client';
// import { CMISideDesignType } from '../hooks/designHooks.client';
// import { CMIProductSide } from '../products.client';
import {CMIObjectType} from '../../CMI/hooks/designHooks.client';
import SelectProduct from './products/selectProduct.client';
import {CMIProductColour, CMIProductSide, CMIproductType} from '@admin/meta';
import {ImageEditor} from './objects/imageEditor.client';
import {TextEditor} from './objects/TextEditor.client';

type Props = {
  openedTab: leftTabType;
  selectedDesigns: CMIObjectType[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<CMIproductType>>;
  setSelectedDesigns: (t: CMIObjectType[]) => void;
  selectedProduct: CMIproductType;
  selectedObject: CMIObjectType | null;
  onChange: (obj: CMIObjectType, resetLoad?:boolean) => void;
  addObject: (obj: CMIObjectType) => void;
  setSelectedColor: (color: CMIProductColour) => void;
  selectObject:(obj:CMIObjectType) => void
  selectedSide:CMIProductSide
};

export function EditMenu({
  openedTab,
  selectedDesigns,
  setSelectedProduct,
  setSelectedDesigns,
  selectedObject,
  selectedProduct,
  setSelectedColor,
  onChange,
  addObject,
  selectObject,
  selectedSide
}: Props) {
  return (
    <div className="shadow-md text-center">
      <div className="w-96 h-screen text-center">
        {(() => {
          switch (openedTab) {
            case 'product':
              return (
                <SelectProduct
                  setSelectedColor={setSelectedColor}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                />
              );

            case 'image':
              return (
                <ImageEditor
                  onChange={onChange}
                  selectedObject={selectedObject}
                  addObject={addObject}
                  selectedSide={selectedSide}
                />
              );

            case 'text':
              return <TextEditor addText={addObject} />;
            case 'layers':
              return (
                <LayerEditor
                selectObject={selectObject}
                  setSelectedDesigns={setSelectedDesigns}
                  selectedDesigns={selectedDesigns}
                />
              );

            default:
              return <></>;
          }
        })()}
      </div>
    </div>
  );
}
