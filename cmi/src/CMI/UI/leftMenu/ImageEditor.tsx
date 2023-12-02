import { Button, Modal } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useState } from 'react';
import { DropzoneComponent } from './Dropzone.client';
import { CMILeftTabType } from '../../hooks/leftTabHooks.client';
import { CMIHooksType } from '../../hooks';

type Props = {
  CMIHooks: CMIHooksType;
  leftTabHook: CMILeftTabType;
};

export default function ImageEditor({ CMIHooks, leftTabHook }: Props) {

  return (
    <div className="p-4 rounded-lg h-full">
      <DropzoneComponent
        addImage={(file) => {
          CMIHooks.utils.addImageFromFile(file);
          leftTabHook.setOpenedTab(null);
        }}
      />
    </div>
  );
}
