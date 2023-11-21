import React from 'react';
import {LeftMenuButton} from '../../CMIComponents/LeftMenuButton.client';
import {leftTabType} from '../../../CMI/hooks/leftTabHooks.client';
import {IconLetterT, IconPhoto} from '@tabler/icons-react';

type Props = {
  setOpenedTab: React.Dispatch<React.SetStateAction<leftTabType>>;
};

export function Objects({setOpenedTab}: Props) {
  return (
    <>
      <LeftMenuButton onClick={() => setOpenedTab('image')}>
        <IconPhoto />
        Image
      </LeftMenuButton>
      <LeftMenuButton onClick={() => setOpenedTab('text')}>
        <IconLetterT />
        Text
      </LeftMenuButton>
    </>
  );
}
