import { Button, Modal } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import React, { useState } from 'react';
import { CMIObjectType, designHookType } from '../../hooks/designHooks.client';
import { DropzoneComponent } from './Dropzone.client';
import { productHookType } from '../../hooks/productHooks.client';
import { CMILeftTabType } from '../../hooks/leftTabHooks.client';

type Props = {
  designHooks: designHookType;
  productHook: productHookType;
  leftTabHook:CMILeftTabType
};

export default function ImageEditor({ designHooks, productHook, leftTabHook }: Props) {
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const { setDesigns, designs, setLoading } = designHooks;
  const { selectedSide } = productHook;
  const addObject = (obj: CMIObjectType) => {
    const target = { ...designs };
    console.log(target,selectedSide.sideName);
    
    target[selectedSide.sideName] = [...target[selectedSide.sideName], obj];
    setDesigns(target);
    setUploadImageModal(false)
    leftTabHook.setOpenedTab(null)
    setLoading(true);
  };
  return (
    <div className="bg-white p-4 shadow-md rounded-lg h-full">
      <Button
        leftIcon={<IconUpload />}
        onClick={() => setUploadImageModal(true)}
      >
        Upload Image
      </Button>
      <Modal
        opened={uploadImageModal}
        onClose={() => setUploadImageModal(false)}
        size={'xl'}
      >
        <DropzoneComponent
          onClose={() => setUploadImageModal(false)}
          addImage={addObject}
          selectedSide={selectedSide}
        />
      </Modal>
    </div>
  );
}
