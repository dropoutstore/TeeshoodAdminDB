/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { CMIHooksType } from '.';
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBoxAlignRight,
  IconBoxAlignTop,
  IconBoxMargin,
  IconColorPicker,
  IconCrop,
  IconEdit,
  IconFlipHorizontal,
  IconFlipVertical,
  IconLayoutAlignCenter,
  IconLayoutDistributeHorizontal,
  IconLayoutDistributeVertical,
  IconPaint,
  IconRotate,
  IconSpace,
  IconTransform,
  IconTypography,
  IconWand,
} from '@tabler/icons-react';
import { productHookType } from './productHooks.client';
import { designHookType } from './designHooks.client';
import { NumberInput, Slider, Textarea } from '@mantine/core';
import { rotateAroundCenter } from '../utils/rotation';
import { FontsSelector } from '../UI/leftMenu/FontsSelector';
import { ColorPickerComponent } from '../UI/leftMenu/colorPicker';

export type topEditMenuType =
  | 'changeText'
  | 'font'
  | 'color'
  | 'strokeColor'
  | 'stroke'
  | 'shadow'
  | 'textAlign'
  | 'crop'
  | 'removeBG'
  | 'position'
  | 'flip'
  | 'rotate'
  | 'alignLeft'
  | 'alignTop'
  | 'alignBottom'
  | 'alignRight'
  | 'alignVertical'
  | 'alignHorizontal'
  //   | '
  | null;

export interface CMIEditItemType {
  section: string;
  items: {
    name: string;
    icon: JSX.Element;
    label: string;
    onClick?: () => void;
    element?: React.ReactNode;
  }[];
}
export interface CMItopHookType {
  selectedMenu: topEditMenuType | null;
  setSelectedMenu: React.Dispatch<React.SetStateAction<topEditMenuType | null>>;
  editBaseItems: CMIEditItemType[];
  editTextItems: CMIEditItemType[];
  editImageItems: CMIEditItemType[];
  cropModal: string | null;
  removeBgModal: string | null;
  setCropModal: React.Dispatch<React.SetStateAction<string | null>>;
  setRemoveBgModal: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function useTopEditHook({
  productHooks,
  designHooks,
}: {
  productHooks: productHookType;
  designHooks: designHookType;
}): CMItopHookType {
  const [selectedMenu, setSelectedMenu] = useState<topEditMenuType>(null);
  const { selectedObject, setSelectObject, selectedRef } = designHooks;
  const { selectedSide } = productHooks;
  const [cropModal, setCropModal] = useState<string | null>(null);
  const [removeBgModal, setRemoveBgModal] = useState<string | null>(null);
  const editBaseItems = [
    {
      section: 'Transform',
      items: [
        {
          name: 'rotate',
          icon: <IconRotate />,
          label: 'Rotate',
          onClick: () => setSelectedMenu('rotate'),
          element: (
            <div className="grid grid-cols-3 items-center gap-1">
              <Slider
                className="col-span-2"
                value={selectedObject?.rotation}
                max={180}
                min={-180}
                onChange={(v) => {
                  if (selectedObject) {
                    let newValues;
                    if (selectedObject?.type === 'image') {
                      newValues = rotateAroundCenter(
                        selectedObject,
                        v - selectedObject.rotation
                      );
                    } else {
                      newValues = rotateAroundCenter(
                        {
                          ...selectedObject,
                          width: selectedRef.current.width(),
                          height: selectedRef.current.height(),
                        },
                        v - selectedObject.rotation
                      );
                    }
                    setSelectObject({ ...selectedObject, ...newValues });
                  }
                }}
              />
              <NumberInput
                className="col-span-1"
                classNames={{ label: 'h-0' }}
                value={selectedObject?.rotation}
                max={180}
                min={-180}
                onChange={(v: number) => {
                  if (selectedObject) {
                    let newValues;
                    if (selectedObject?.type === 'image') {
                      newValues = rotateAroundCenter(
                        selectedObject,
                        v - selectedObject.rotation
                      );
                    } else {
                      newValues = rotateAroundCenter(
                        {
                          ...selectedObject,
                          width: selectedRef.current.width(),
                          height: selectedRef.current.height(),
                        },
                        v - selectedObject.rotation
                      );
                    }
                    setSelectObject({ ...selectedObject, ...newValues });
                  }
                }}
              />
            </div>
          ),
        },
      ],
    },
    {
      section: 'Position',
      items: [
        {
          name: 'alignLeft',
          icon: <IconBoxAlignLeft />,
          label: 'Align Left',
          onClick: () => {
            // @ts-ignore
            setSelectObject((obj) => {
              if (obj) return { ...obj, x: 0 };
            });
          },
        },
        {
          name: 'alignTop',
          icon: <IconBoxAlignTop />,
          label: 'Align Top',
          onClick: () => {
            // @ts-ignore
            setSelectObject((obj) => {
              if (obj) return { ...obj, y: 0 };
            });
          },
        },
        {
          name: 'alignBottom',
          icon: <IconBoxAlignBottom />,
          label: 'Align Bottom',
          onClick: () => {
            // @ts-ignore
            setSelectObject((obj) => {
              if (obj)
                return {
                  ...obj,
                  y: selectedSide.h - selectedRef.current.height(),
                };
            });
          },
        },
        {
          name: 'alignRight',
          icon: <IconBoxAlignRight />,
          label: 'Align Right',
          onClick: () => {
            // @ts-ignore
            setSelectObject((obj) => {
              if (obj)
                return {
                  ...obj,
                  x: selectedSide.w - selectedRef.current.width(),
                };
            });
          },
        },
        {
          name: 'alignVertical',
          icon: <IconLayoutDistributeVertical />,
          label: 'Align Vertical',
          onClick: () => {
            // @ts-ignore
            setSelectObject((obj) => {
              if (obj)
                return {
                  ...obj,
                  x: (selectedSide.w - selectedRef.current.width()) / 2,
                };
            });
          },
        },
        {
          name: 'alignHorizontal',
          icon: <IconLayoutDistributeHorizontal />,
          label: 'Align Horizontal',
          onClick: () => {
            // @ts-ignore
            setSelectObject((obj) => {
              if (obj)
                return {
                  ...obj,
                  y: (selectedSide.h - selectedRef.current.height()) / 2,
                };
            });
          },
        },
      ],
    },
    {
      section: 'Flip',
      items: [
        {
          name: 'flipVertical',
          icon: <IconFlipVertical />,
          label: 'Flip Vertical',
          onClick: () => {
            // @ts-ignore
            setSelectObject((obj) => {
              if (obj)
                return {
                  ...obj,
                  flipY: !obj.flipY,
                  y: obj.flipY
                    ? obj.y - (obj.height ?? 0)
                    : obj.y + (obj.height ?? 0),
                };
            });
          },
        },
        {
          name: 'flipHorizontal',
          icon: <IconFlipHorizontal />,
          label: 'Flip Horizontal',
          onClick: () => {
            // @ts-ignore
            setSelectObject((obj) => {
              if (obj)
                return {
                  ...obj,
                  flipX: !obj.flipX,
                  x: obj.flipX
                    ? obj.x - (obj.width ?? 0)
                    : obj.x + (obj.width ?? 0),
                };
            });
          },
        },
      ],
    },
  ];
  const editTextItems = [
    {
      section: 'Edit Text',
      items: [
        {
          name: 'changeText',
          icon: <IconEdit />,
          label: 'Change Text',
          onClick: () => setSelectedMenu('changeText'),
          element: (
            <Textarea
              className="w-full"
              value={selectedObject?.text}
              onChange={(v) =>
                // @ts-ignore
                setSelectObject((obj) => {
                  if (obj)
                    return {
                      ...obj,
                      text: v.target.value,
                    };
                })
              }
            />
          ),
        },
        {
          name: 'font',
          icon: <IconTypography />,
          label: 'Select Font',
          onClick: () => setSelectedMenu('font'),
          element: (
            <FontsSelector
              selectedFont={selectedObject?.fontFamily ?? ''}
              setSelectedFont={(e) => {
                if (selectedObject && e)
                  // @ts-ignore
                  setSelectObject({ ...selectedObject, fontFamily: e.name });
              }}
            />
          ),
        },
        {
          name: 'color',
          icon: <IconPaint />,
          label: 'Text Color',
          onClick: () => setSelectedMenu('color'),
          element: (
            <ColorPickerComponent
              color={selectedObject?.fill ?? ''}
              // @ts-ignore
              setColor={(c) => setSelectObject({ ...selectedObject, fill: c })}
              title="Font Color"
            />
          ),
        },
      ],
    },
    {
      section: 'Text Outline',
      items: [
        {
          name: 'strokeColor',
          icon: <IconBoxMargin />,
          label: 'Stroke',
          onClick: () => setSelectedMenu('strokeColor'),
          element: (
            <ColorPickerComponent
              color={selectedObject?.fill ?? ''}
              // @ts-ignore
              setColor={(c) => setSelectObject({ ...selectedObject, fill: c })}
              title="Stroke Color"
            />
          ),
        },
        {
          name: 'stroke',
          icon: <IconColorPicker />,
          label: 'Stroke Width',
          onClick: () => setSelectedMenu('stroke'),
          element: (
            <div className="grid grid-cols-3 items-center gap-1">
              <Slider
                className="col-span-2"
                value={selectedObject?.strokeWidth}
                max={80}
                min={0}
                onChange={(v) => {
                  if (selectedObject) {
                    // @ts-ignore
                    setSelectObject({ ...selectedObject, strokeWidth: v });
                  }
                }}
              />
              <NumberInput
                className="col-span-1"
                classNames={{ label: 'h-0' }}
                value={selectedObject?.strokeWidth}
                max={80}
                min={0}
                onChange={(v: number) => {
                  if (selectedObject) {
                    // @ts-ignore
                    setSelectObject({ ...selectedObject, strokeWidth: v });
                  }
                }}
              />
            </div>
          ),
        },
      ],
    },
    {
      section: 'Text Align',
      items: [
        {
          name: 'textAlignLeft',
          icon: <IconAlignLeft />,
          label: 'Align Left',
          // @ts-ignore
          onClick: () => setSelectObject({ ...selectedObject, align: 'left' }),
        },
        {
          name: 'textAlignCenter',
          icon: <IconAlignCenter />,
          label: 'Align Center',
          onClick: () =>
            // @ts-ignore
            setSelectObject({ ...selectedObject, align: 'center' }),
        },
        {
          name: 'textAlignRight',
          icon: <IconAlignRight />,
          label: 'Align Right',
          // @ts-ignore
          onClick: () => setSelectObject({ ...selectedObject, align: 'right' }),
        },
        {
          name: 'textAlignJustify',
          icon: <IconAlignJustified />,
          label: 'Align Justify',
          onClick: () =>
            // @ts-ignore
            setSelectObject({ ...selectedObject, align: 'justify' }),
        },
      ],
    },
  ];
  const editImageItems = [
    {
      section: 'Edit Image',
      items: [
        {
          name: 'crop',
          icon: <IconCrop />,
          label: 'Crop',
          onClick: () => {
            setCropModal(selectedObject?.originalSrc ?? null);
          },
        },
        {
          name: 'removeBg',
          icon: <IconWand />,
          label: 'Remove Bg',
          onClick: () => setRemoveBgModal(selectedObject?.originalSrc ?? null),
        },
      ],
    },
  ];
  return {
    selectedMenu,
    setSelectedMenu,
    editBaseItems,
    editTextItems,
    editImageItems,
    removeBgModal,
    cropModal,
    setCropModal,
    setRemoveBgModal,
  };
}
