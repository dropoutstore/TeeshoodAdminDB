import { Button, Modal, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { SelectProduct } from './selectProduct';
import { CMIproductType } from '@admin/meta';
import { BulkOrderProduct } from './bulkOrderUtils';
import ProductForm from './productForm';

export function BulkOrderForm({
  addProduct,
}: {
  addProduct: (product: BulkOrderProduct) => void;
}) {
  const [opened, setOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CMIproductType | null>(
    null
  );
  return (
    <div>
      <Button
        className="col-span-1 h-12"
        fullWidth
        variant="subtle"
        onClick={() => setOpened(true)}
        leftIcon={<IconPlus />}
      >
        Add Product
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)} fullScreen>
        <div className="text-center pb-20">
          {selectedProduct ? (
            <ProductForm
              product={selectedProduct}
              selectProduct={setSelectedProduct}
              addProduct={(product: BulkOrderProduct) => {
                addProduct(product);
                setOpened(false);
              }}
            />
          ) : (
            <div>
              <Title className="my-6" order={4}>
                Select Product
              </Title>
              <div>
                <SelectProduct selectProduct={setSelectedProduct} />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
