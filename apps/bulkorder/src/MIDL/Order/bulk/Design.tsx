import React, { useState } from 'react';
import { CMI } from '@admin/cmi';
import { CMIproductType } from '@admin/meta';
import { Button, Modal } from '@mantine/core';
type Props = {
  product: CMIproductType;
};

export default function BulkDesign({ product }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button onClick={()=>setModalOpen(true)} >Add Design</Button>
      <Modal fullScreen opened={modalOpen} onClose={() => setModalOpen(false)}>
        <CMI 
        //product={product} 
        />
      </Modal>
    </>
  );
}
