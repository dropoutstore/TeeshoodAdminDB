import React from 'react';
import { CMIProductSide } from '@admin/meta';
import { Button } from '@mantine/core';
import { productHookType } from '../../hooks/productHooks.client';
import { CMIHooksType } from '../../hooks';

type Props = {
  CMIHooks: CMIHooksType;
  // sides: CMIProductSide[];
  // setSelectedSide: React.Dispatch<React.SetStateAction<CMIProductSide>>;
  // selectedSide: CMIProductSide;
};

export function SidePick({ CMIHooks:{designHooks,productHooks} }: Props) {
  const { selectedProduct, selectedColour, selectedSide, setSelectedSide } =
    productHooks;
  const sides = selectedProduct.colours.find(
    (color) => color.name === selectedColour.name
  )?.sides;
  return (
    <div className="flex gap-2 my-2 justify-center">
      {sides?.map((side) => (
        <Button
          radius={4}
          key={side.sideName}
          // color="green"
          variant={side.sideName === selectedSide.sideName ? 'outline' : 'subtle'}
          // className={`p-2 ${
          //   side.sideName === selectedSide.sideName
          //     ? 'bg-green-700 text-white'
          //     : 'bg-white'
          // } border border-gray-300 rounded-md w-20`}
          onClick={() => {
            setSelectedSide(side)
            designHooks.setSelectObject(null)
          }}
        >
          {side.sideName}
        </Button>
      ))}
    </div>
  );
}
