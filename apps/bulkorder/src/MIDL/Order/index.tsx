import { BulkOrdersTable } from './bulk/orderTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { BulkOrder } from './bulk/BulkOrder';
import POD from './POD';

export default function Orders() {
 
  return (
    <div className="text-center">
      <div className="p-2">
        <div className="p-2 md:p-6 py-10 w-full grid grid-cols-1 md:grid-cols-2 justify-center gap-10 bg-white rounded-xl">
          <BulkOrder />
          <POD />
        </div>
      </div>
      <BulkOrdersTable />
    </div>
  );
}
