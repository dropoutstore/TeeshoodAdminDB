import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { DEFAULT_THEME, Modal } from '@mantine/core';
import { CMILeftTabType } from '../../hooks/leftTabHooks.client';
type Props = {
  children: React.ReactNode;
  leftTabHook: CMILeftTabType;
  opened: boolean;
};

export default function LeftMenuWrapper({
  children,
  leftTabHook,
  opened,
}: Props) {
  const matches = useMediaQuery('(min-width: 56.25em)');
  if(opened){
      if (matches)
        return (
          <div className="w-80 fixed md:relative bg-white p-4 rounded-lg h-full border-solid border border-gray-400">
            {children}
          </div>
        );
      else
        return (
          <Modal opened={opened} onClose={() => leftTabHook.setOpenedTab(null)}>
            {children}
          </Modal>
        );
  }else return<></>
}
