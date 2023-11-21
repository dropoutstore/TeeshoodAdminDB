import { Button, FileInput, Group, Modal, Text, rem } from '@mantine/core';
import { IconFileSpreadsheet, IconUpload, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import Papa from 'papaparse';
import { UploadProductTable } from './uploadTable';
import { Dropzone } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
export type CombinedProduct = {
  Handle: string;
  Title: string;
  Variants: ProductVariant[];
  // include other product-specific fields
};
type ProductVariant = {
  Option1Value: string;
  // include other variant-specific fields
};
export function BulkProductUpload() {
  const [products, setProducts] = useState<CombinedProduct[]>([]);
  const handleFileUpload = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const combinedProducts = combineProducts(result.data);
        setProducts(combinedProducts);
      },
    });
  };
  const combineProducts = (data: any[]): CombinedProduct[] => {
    const productMap: { [key: string]: CombinedProduct } = {};

    data.forEach((row) => {
      const handle = row.Handle;
      const title = row.Title || '';

      if (!productMap[handle]) {
        productMap[handle] = { Handle: handle, Title: title, Variants: [] };
      }

      const variant: ProductVariant = {
        Option1Value: row.Option1Value,
        // map other variant-specific fields
      };

      productMap[handle].Variants.push(variant);
    });

    return Object.values(productMap);
  };
  return (
    <div>
      <Dropzone
        accept={['.csv']}
        onDrop={(files) => handleFileUpload(files[0])}
        onReject={(files) => {
          notifications.show({
            message: 'File not accepted!',
            color: 'red',
            icon: <IconX />,
            id: Math.random().toLocaleString(),
          });
        }}
        maxSize={3 * 1024 ** 2}
      >
        <Group
          className="justify-center p-4"
          mih={220}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFileSpreadsheet
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-dimmed)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag CSV File here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach only one file. should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
     
      <Modal
        opened={products.length > 0}
        onClose={() => setProducts([])}
        fullScreen
      >
        <div>
          <UploadProductTable products={products} />
        </div>
      </Modal>
    </div>
  );
}
