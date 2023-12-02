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
import LeftMenuExpanded from './LeftMenuExpanded';
import { CMIHooksType } from '../../hooks';

type Props = {
  CMIHooks: CMIHooksType;
};

export default function LeftMenu({ CMIHooks }: Props) {
  const { setOpenedTab } = CMIHooks.leftTab;
  return (
    <div className=" flex gap-x-2 md:max-h-none">
      <div className="fixed text-center bottom-1 shadow-md md:shadow-none flex-grow md:relative md:w-20 flex md:flex-col md:gap-6 md:bottom-auto md:border-solid border md:border-gray-400 p-2 rounded-lg bg-white z-50">
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
              <ActionIcon className="mx-auto" size={36} onClick={()=>{
                CMIHooks.designHooks.setSelectObject(null)
                menu.onClick()
                
                }}>
                {menu.icon}
              </ActionIcon>
            </div>
          </Tooltip>
        ))}
      </div>
      <LeftMenuExpanded leftTabHook={CMIHooks.leftTab} CMIHooks={CMIHooks} />
    </div>
  );
}

const iconProps: TablerIconsProps = { size: 48, stroke: 1, color: 'black' };
