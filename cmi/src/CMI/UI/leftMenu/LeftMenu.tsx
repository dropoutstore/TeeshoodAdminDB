import { ActionIcon, Button, Tooltip } from '@mantine/core';
import {
  IconBrush,
  IconHelp,
  IconLayersIntersect,
  IconLetterT,
  IconQrcode,
  IconShirt,
  IconUpload,
  TablerIconsProps,
} from '@tabler/icons-react';
import {
  CMILeftTabType,
  useLeftTabHooks,
} from '../../hooks/leftTabHooks.client';
import LeftMenuExpanded from './LeftMenuExpanded';
import { productHookType } from '../../hooks/productHooks.client';
import { designHookType } from '../../hooks/designHooks.client';

type Props = {
  productHook: productHookType;
  designHooks: designHookType;
};

export default function LeftMenu({ productHook, designHooks }: Props) {
  const leftTab: CMILeftTabType = useLeftTabHooks();
  const { openedTab, setOpenedTab } = leftTab;
  return (
    <div className="flex gap-x-2 md:max-h-none">
      <div className="fixed text-center bottom-1 flex-grow md:relative md:w-20 flex md:flex-col md:gap-6 md:bottom-auto border-solid border border-gray-400 p-2 rounded-lg">
        {[
          {
            name: 'Products',
            icon: <IconShirt {...iconProps} />,
            onClick: () => setOpenedTab('product'),
          },
          {
            name: 'Layers',
            icon: <IconLayersIntersect {...iconProps} />,
            onClick: () => setOpenedTab('layers'),
          },
          {
            name: 'Upload',
            icon: <IconUpload {...iconProps} />,
            onClick: () => setOpenedTab('image'),
          },
          {
            name: 'Text',
            icon: <IconLetterT {...iconProps} />,
            onClick: () => setOpenedTab('text'),
          },
          {
            name: 'QR Code',
            icon: <IconQrcode {...iconProps} />,
            onClick: () => setOpenedTab('QR'),
          },
          {
            name: 'Hire Designer',
            icon: <IconBrush {...iconProps} />,
            onClick: () => setOpenedTab('hire'),
          },
          {
            name: 'Help',
            icon: <IconHelp {...iconProps} />,
            onClick: () => setOpenedTab('help'),
          },
        ].map((menu) => (
          <Tooltip
            key={menu.name}
            label={menu.name}
            position="right"
            offset={5}
          >
            <div
              onClick={menu.onClick}
              className="p-3 hover:bg-slate-50 rounded-md cursor-pointer"
            >
              <ActionIcon className="mx-auto" size={36} onClick={menu.onClick}>
                {menu.icon}
              </ActionIcon>
            </div>
          </Tooltip>
        ))}
      </div>

      <LeftMenuExpanded
        leftTabHook={leftTab}
        productHook={productHook}
        designHooks={designHooks}
      />
    </div>
  );
}

const iconProps: TablerIconsProps = { size: 48, stroke: 1, color: 'black' };
