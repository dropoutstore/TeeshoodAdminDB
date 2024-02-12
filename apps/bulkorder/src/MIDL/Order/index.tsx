import { BulkOrdersTable } from './bulk/orderTable';
import { BulkOrder } from './bulk/BulkOrder';
import { POD } from './POD';
import { SegmentedControl } from '@mantine/core';
import { useState } from 'react';
import { PODOrdersTable } from './POD/orderTable';

export default function Orders() {
  const [currentOrder, setCurrentOrder] = useState<
    'bulk orders' | 'print on demand'
  >('bulk orders');
  return (
    <div className="text-center">
      <div className="p-2">
        <div className="p-2 md:p-6 py-10 w-full grid grid-cols-1 md:grid-cols-2 justify-center gap-10 bg-white rounded-xl">
          <BulkOrder />
          <POD />
        </div>
      </div>
      <div className="flex justify-center p-3">
        <SegmentedControl
          className="self-center"
          data={['bulk orders', 'print on demand']}
          onChange={(v: any) => setCurrentOrder(v)}
        />
      </div>
      {currentOrder === 'bulk orders' ? (
        <BulkOrdersTable />
      ) : (
        <PODOrdersTable />
      )}
    </div>
  );
}
