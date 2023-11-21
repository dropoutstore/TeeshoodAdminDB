import React from 'react';
import { CMILeftTabType, leftTabType } from '../../hooks/leftTabHooks.client';
import Products from './products';
import { productHookType } from '../../hooks/productHooks.client';
import { LayerEditor } from './layers';
import { designHookType } from '../../hooks/designHooks.client';
import ImageEditor from './ImageEditor';
import QRcode from './QRcode';
import LeftMenuWrapper from './LeftMenuWrapper';

type Props = {
  leftTabHook: CMILeftTabType;
  productHook: productHookType;
  designHooks: designHookType;
};

export default function LeftMenuExpanded({
  leftTabHook,
  productHook,
  designHooks,
}: Props) {
  const Menus = () => {
    switch (leftTabHook.openedTab) {
      case 'product':
        return <Products productHook={productHook} />;
        case 'edit':
            return <Products productHook={productHook} />;
      case 'layers':
        return (
          <LayerEditor designHooks={designHooks} productHook={productHook} />
        );
      case 'image':
        return (
          <ImageEditor designHooks={designHooks} productHook={productHook} leftTabHook={leftTabHook} />
        );
      case 'QR':
        return (
          <QRcode
            designHooks={designHooks}
            //   productHook={productHook}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <LeftMenuWrapper opened={Boolean(leftTabHook.openedTab)} leftTabHook={leftTabHook}>
      <Menus />
    </LeftMenuWrapper>
  );
}
