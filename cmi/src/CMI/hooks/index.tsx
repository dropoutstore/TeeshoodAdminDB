import { useEffect } from 'react';
import { productHookType, useProductHooks } from './productHooks.client';
import {
  CMIObjectType,
  CMISideDesignType,
  CMITextInputForm,
  designHookType,
  useDesignHooks,
} from './designHooks.client';
import { resizeDimensions } from '../utils/resizeImageinsideBox';
import { getImageDimensionsFromUrl } from '../utils/getImageDimensions';
import { v4 } from 'uuid';
import { CMILeftTabType, useLeftTabHooks } from './leftTabHooks.client';
import useTopEditHook, { CMItopHookType } from './topEditHook';

export interface CMIutilsHooksType {
  addImageFromFile: (imageFile: File) => Promise<void>;
  addImage: (imageUrl: string) => Promise<void>;
  addText: (text: string, formValues?: CMITextInputForm) => void;
  updateObject: (
    // id: string,
    key: string,
    value: string | number | boolean
  ) => void;
}

export interface CMIHooksType {
  productHooks: productHookType;
  designHooks: designHookType;
  utils: CMIutilsHooksType;
  leftTab: CMILeftTabType;
  topTabHooks: CMItopHookType;
}

export default function useCMIHooks(): CMIHooksType {
  const productHooks = useProductHooks();
  const designHooks = useDesignHooks();
  const leftTab = useLeftTabHooks();
  const topTabHooks = useTopEditHook({ productHooks, designHooks });
  const { selectedSide } = productHooks;
  const { setDesigns, setLoading, setSelectObject, selectedObject } =
    designHooks;
  useEffect(() => {
    if (designHooks.selectedObject) leftTab.setOpenedTab(null);
    // else leftTab.setOpenedTab('product');
  }, [designHooks.selectedObject]);

  useEffect(() => {
    if (productHooks.selectedColour) {
      const initDesigns: CMISideDesignType = {};
      for (const side of productHooks.selectedColour.sides) {
        initDesigns[side.sideName] = [];
      }
      setDesigns(initDesigns);
      setLoading(false);
    }
  }, [productHooks.selectedColour]);

  useEffect(() => {
    if (selectedObject) {
      const designCopy = { ...designHooks.designs };
      const sideDesignCopy = designCopy[selectedSide.sideName];
      const index = sideDesignCopy.findIndex((i) => i.id === selectedObject.id);
      sideDesignCopy.splice(index, 1, selectedObject);
      designCopy[selectedSide.sideName] = sideDesignCopy;
      setDesigns(designCopy);
    }
  }, [selectedObject]);
  const updateObject = (
    // id: string,
    key: string,
    value: string | number | boolean
  ) => {
    if (selectedObject) {
      const target = { ...selectedObject, [key]: value };
      setSelectObject(target);
    }
  };

  const addImageFromFile = async (imageFile: File) => {
    const src = URL.createObjectURL(imageFile);

    addImage(src);
  };
  const addText = (text: string, formValues?: CMITextInputForm) => {
    const target = { ...designHooks.designs };
    let targetText: CMIObjectType = {
      text,
      type: 'text',
      fill: '#000000',
      fontFamily: "'Roboto',sans-serif",
      fontSize: 15,
      id: v4().toString(),
      rotation: 0,
      x: 2,
      y: (selectedSide.h - 7) / 2,
      stroke: '#000',
      strokeWidth: 0,
      align: 'left',
    };
    if (formValues) {
      targetText = {
        ...targetText,
        x: 2,
        ...formValues,
        y: (selectedSide.h - formValues.fontSize / 2) / 2,
        fontFamily: formValues.fontFamily?.name ?? '',
      };
    }
    target[selectedSide.sideName] = [
      ...target[selectedSide.sideName],
      targetText,
    ];
    setDesigns(target);
    setLoading(true);
  };

  const addImage = async (imageUrl: string) => {
    const target = { ...designHooks.designs };
    const dimensions = await getImageDimensionsFromUrl(imageUrl);
    const { width, height } = resizeDimensions(
      selectedSide.w - 10,
      selectedSide.h - 10,
      dimensions.width,
      dimensions.height
    );
    target[selectedSide.sideName] = [
      ...target[selectedSide.sideName],
      {
        src: imageUrl,
        originalSrc: imageUrl,
        type: 'image',
        height,
        id: v4().toString(),
        rotation: 0,
        width,
        x: (selectedSide.w - width) / 2,
        y: (selectedSide.h - height) / 2,
      },
    ];
    setDesigns(target);
    setLoading(true);
  };
  return {
    productHooks,
    designHooks,
    utils: { addImage, addImageFromFile, addText, updateObject },
    leftTab,
    topTabHooks,
  };
}
