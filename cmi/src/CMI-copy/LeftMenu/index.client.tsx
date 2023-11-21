import React from 'react';
import {LeftBar} from './LeftBar.client';
import {CMIProductColour, CMIProductSide, CMIproductType} from '@admin/meta';
import {EditMenu} from './EditMenu.client';
import {useLeftTabHooks} from '../../CMI/hooks/leftTabHooks.client';
import {CMIObjectType} from '../../CMI/hooks/designHooks.client';
// import { CMISideDesignType } from '../hooks/designHooks.client';

type Props = {
  setSelectedProduct: React.Dispatch<React.SetStateAction<CMIproductType>>;
  selectedDesigns: CMIObjectType[];
  setSelectedDesigns: (t: CMIObjectType[]) => void;
  selectedProduct: CMIproductType;
  selectedObject: CMIObjectType | null;
  onChange: (obj: CMIObjectType, resetLoad?:boolean) => void;
  addObject: (obj: CMIObjectType) => void;
  setSelectedColor: (color: CMIProductColour) => void;
  selectObject: (obj: CMIObjectType) => void;
  selectedSide:CMIProductSide
};

export function LeftMenu({
  setSelectedProduct,
  selectedDesigns,
  setSelectedDesigns,
  selectedProduct,
  selectedObject,
  onChange,
  addObject,
  setSelectedColor,
  selectObject,
  selectedSide
}: Props) {
  const {openedTab, setOpenedTab} = useLeftTabHooks();

  return (
    <div className="flex">
      <LeftBar setOpenedTab={setOpenedTab} />
      <EditMenu
        selectObject={(obj: CMIObjectType) => selectObject(obj)}
        setSelectedColor={setSelectedColor}
        onChange={onChange}
        addObject={addObject}
        selectedProduct={selectedProduct}
        openedTab={openedTab}
        setSelectedProduct={setSelectedProduct}
        selectedDesigns={selectedDesigns}
        setSelectedDesigns={setSelectedDesigns}
        selectedObject={selectedObject}
        selectedSide={selectedSide}
      />
    </div>
  );
}
