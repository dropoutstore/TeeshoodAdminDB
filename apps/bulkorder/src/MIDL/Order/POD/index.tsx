import { Button, Modal, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { UploadPODOrdersTable } from './uploadShopify';

export function POD() {
  const [podOrderModal, setPodOrderModal] = useState(false);
  return (
    <div>
      <Button
        className="col-span-1 h-28 md:h-48"
        fullWidth
        size="xl"
        variant="light"
        leftIcon={<IconPlus />}
        onClick={() => setPodOrderModal(true)}
      >
        Print On Demand
      </Button>
      <Modal
        onClose={() => setPodOrderModal(false)}
        opened={podOrderModal}
        fullScreen
        title={<Title align='center' >POD Orders</Title>}
        classNames={{title:"w-full"}}
      >
        <UploadPODOrdersTable />
      </Modal>
    </div>
  );
}
