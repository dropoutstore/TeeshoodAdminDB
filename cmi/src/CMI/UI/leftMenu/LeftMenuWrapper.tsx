import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Modal } from '@mantine/core';
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
  const matches = useMediaQuery('(min-width: 768px)');
  if (matches)
    return (
      <div className="w-80 md:relative bg-white p-4 rounded-lg h-full border-solid border border-gray-400">
        {children}
      </div>
    );
  else if (opened) {
    return (
      <Modal fullScreen opened={opened} onClose={() => leftTabHook.setOpenedTab(null)}>
        {children}
      </Modal>
    );
  } else return <></>;
}
