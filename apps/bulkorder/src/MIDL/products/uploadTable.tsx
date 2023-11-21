import React, { useState } from 'react';

import { Paper, Title, Text, Group, Divider, FileInput, SimpleGrid, Card } from '@mantine/core';
import { CombinedProduct } from './BulkProductUpload';





export const UploadProductTable = ({products}:{products:CombinedProduct[]}) => {
  return (
    <div>
      <SimpleGrid cols={3} spacing="lg" mt="md">
        {products.map(product => (
          <Card key={product.Handle} shadow="sm" padding="lg">
            <Title order={4}>{product.Title}</Title>
            <Divider my="sm" />
            {product.Variants.map((variant, index) => (
              <Text key={index}>{variant.Option1Value}</Text>
              // Display other variant details here
            ))}
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

