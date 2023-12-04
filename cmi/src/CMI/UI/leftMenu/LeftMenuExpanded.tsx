import React from 'react';
import { CMILeftTabType, leftTabType } from '../../hooks/leftTabHooks.client';
import Products from './products';
import { productHookType } from '../../hooks/productHooks.client';
import { LayerEditor } from './layers';
import { designHookType } from '../../hooks/designHooks.client';
import ImageEditor from './ImageEditor';
import QRcode from './QRcode';
import LeftMenuWrapper from './LeftMenuWrapper';
import { CMIHooksType } from '../../hooks';
// import { EditMenu } from '../Edit/editMenu';
import { TextEditor } from './TextEditor';
import { EditOptions } from '../TopEdit/EditOptions';
import { useMediaQuery } from '@mantine/hooks';

type Props = {
  leftTabHook: CMILeftTabType;
  CMIHooks: CMIHooksType;
};

export default function LeftMenuExpanded({ leftTabHook, CMIHooks }: Props) {
  const { productHooks, designHooks } = CMIHooks;
  const matches = useMediaQuery('(min-width: 768px)');
  const Menus = () => {
    switch (leftTabHook.openedTab) {
      case 'product':
        return <Products productHook={productHooks} />;
      case 'text':
        return <TextEditor CMIHooks={CMIHooks} />;
      case 'layers':
        return <LayerEditor CMIHooks={CMIHooks} />;
      case 'image':
        return <ImageEditor CMIHooks={CMIHooks} leftTabHook={leftTabHook} />;
      case 'QR':
        return <QRcode CMIHooks={CMIHooks} />;
      default:
        return (
          <div />
        );
    }
  };
  if (designHooks.selectedObject && matches)
    return (
      <div className="w-80 fixed md:relative bg-white p-4 rounded-lg h-full border-solid border border-gray-400">
        <EditOptions CMIHooks={CMIHooks} />
      </div>
    );
  return (
    <LeftMenuWrapper
      opened={Boolean(leftTabHook.openedTab)}
      leftTabHook={leftTabHook}
    >
      <Menus />
    </LeftMenuWrapper>
  );
}
