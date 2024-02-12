/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CMIProductSide } from '@admin/meta';
import { CMIHooksType } from '../hooks';
import { CMIObjectType } from '../hooks/designHooks.client';

export const calculatePrice = (CMIHooks: CMIHooksType): string => {
  const { designs } = CMIHooks.designHooks;
  const { selectedProduct, selectedColour, selectedPrintType } =
    CMIHooks.productHooks;
  const getObjectCost = (CMIObject: CMIObjectType, side: CMIProductSide) => {
    switch (CMIObject.type) {
      case 'image':
        return (
          (CMIObject.width *
            CMIObject.height *
            // @ts-ignore
            selectedColour.printingCost[selectedPrintType]) /
          (side.w * side.h)
        );
      case 'text':
        return (
          (CMIObject.fontSize *
            20 *
            // @ts-ignore
            selectedColour.printingCost[selectedPrintType]) /
          (side.w * side.h)
        );
      default:
        return 0;
    }
  };
  let totalPrice = selectedProduct.basePrice;
  Object.keys(designs).forEach((side) => {
    totalPrice =
      totalPrice +
      designs[side].reduce(
        (prev, curr) =>
          parseFloat(
            getObjectCost(
              curr,
              // @ts-ignore
              selectedColour.sides.find((s) => s.sideName === side)
            ).toFixed(2)
          ) + prev,
        0
      );
  });
  return totalPrice.toFixed(2);
};
