import React from 'react';
// import ZoomAside from '../fullPageAside';
import {SelectProducts} from './products/Products.client';
import {leftTabType} from '../../CMI/hooks/leftTabHooks.client';
import {Layers} from './Layers/index.client';
import {Objects} from './objects/index.client';
import {LeftMenuButton} from '../CMIComponents/LeftMenuButton.client';
import {IconHelp} from '@tabler/icons-react';

type Props = {
  setOpenedTab: React.Dispatch<React.SetStateAction<leftTabType>>;
};

export function LeftBar({setOpenedTab}: Props) {
  return (
    <div className="h-screen shadow-md w-52 flex-col">
      <SelectProducts setOpenedTab={setOpenedTab} />
      <Objects setOpenedTab={setOpenedTab} />
      <Layers setOpenedTab={setOpenedTab} />
      <div className="flex-1"></div>
      <LeftMenuButton onClick={() => void 0}>
        <IconHelp />
        Help
      </LeftMenuButton>
    </div>
  );
}
