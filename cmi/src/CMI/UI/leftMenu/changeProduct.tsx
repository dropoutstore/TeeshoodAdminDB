import { CMIproductType, CMIproducts } from '@admin/meta';
import { Button, Modal } from '@mantine/core';
import React, { useState } from 'react';

type Props = {
  setSelectedProduct: React.Dispatch<CMIproductType>;
//   selectedProduct: CMIproductType;
};

export default function ChangeProduct({
//   selectedProduct,
  setSelectedProduct,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        className="mb-4"
        fullWidth
        onClick={() => setModalOpen(true)}
      >
        Change product
      </Button>
      <Modal
      fullScreen
        onClose={() => setModalOpen(false)}
        opened={modalOpen}
        title="Select Product"
        size={'100%'}
      >
        <div className="flex flex-wrap justify-center gap-4 py-4 rounded-lg">
          {CMIproducts.map((product) => (
            <div
              key={product.name}
              onClick={() => {
                setSelectedProduct(product);
                setModalOpen(false);
              }}
              className="w-80 cursor-pointer border border-gray-300 border-solid rounded-lg overflow-hidden"
            >
              <img src={product.featuredImage} width={300} alt={product.name} />
              <div className="p-4">{product.name}</div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
