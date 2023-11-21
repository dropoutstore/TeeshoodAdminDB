import React from 'react';
import {LeftMenuButton} from '../../CMIComponents/LeftMenuButton.client';
import {leftTabType} from '../../../CMI/hooks/leftTabHooks.client';
import {IconBoxMultiple} from '@tabler/icons-react';

type Props = {
  setOpenedTab: React.Dispatch<React.SetStateAction<leftTabType>>;
};

export function Layers({setOpenedTab}: Props) {
  return (
    <div>
      <LeftMenuButton onClick={() => setOpenedTab('layers')}>
        <IconBoxMultiple />
        Layers
      </LeftMenuButton>
    </div>
  );
}
