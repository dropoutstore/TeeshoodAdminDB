import { CMI } from '@admin/cmi';
import { Button, Modal } from '@mantine/core';
import { useState } from 'react';

export default function ProductForm() {
  const [openProductModal, setOpenProductModal] = useState(false);
  // const [designs, setDesigns] = useState<CMI>()
  return (
    <div>
      <Button onClick={() => setOpenProductModal(true)}>Add</Button>
      <Modal
        opened={openProductModal}
        onClose={() => setOpenProductModal(false)}
        fullScreen
      >
        <div>
            <CMI />
        </div>
      </Modal>
    </div>
  );
}
