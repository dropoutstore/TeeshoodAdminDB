/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { TableComponent } from '@admin/table-component';
import {
  Button,
  Chip,
  Title,
  Select,
  SegmentedControl,
  Group,
  HoverCard,
  Text,
  Popover,
  Card,
  List,
} from '@mantine/core';
import {
  Query,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@admin/configs';
import OrdersExpanded from './expanded';
import { ProductCard, bulkOrderType } from './BulkOrder';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

export function BulkOrdersTable() {
  const { user } = useSelector((state: RootState) => state.user);
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, 'bulkOrder'),
      orderBy('createdAt', 'desc'),
      where('resellerId', '==', user?.uid),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs.map((r) => r.data()));
      setOrders(snapshot.docs.map((t) => t.data()));
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <div className="overflow-auto">
      <Title className="">Orders</Title>
      <br />
      <div className="flex justify-center p-3">
        <SegmentedControl className="self-center" data={TH_ORDER_STATUSES} />
      </div>
      <TableComponent
        tableProps={{
          data: orders,
          columns: [
            // name?: string | number | React.ReactNode;
            // sortField?: string;
            // cell?: (row: T, rowIndex: number, column: TableColumn<T>, id: string | number) => React.ReactNode;
            // conditionalCellStyles?: ConditionalStyles<T>[];
            // format?: Format<T> | undefined;
            // selector?: Selector<T>;
            // sortFunction?: ColumnSortFunction<T>;
            {
              name: 'Order ID',
              selector: (row: bulkOrderType & { id: string }) => '#' + row.id,
              maxWidth: '60px',
            },
            {
              name: 'Order name',
              selector: (row: bulkOrderType & { id: string }) => row.orderName,
            },
            {
              name: 'Phone',
              //   @ts-ignore
              selector: (row: bulkOrderType & { id: string }) => (
                <Text className="w-fit">{row.address.phoneNumber}</Text>
              ),
            },
            // {
            //   name: 'Email',
            //   selector: (row: bulkOrderType & {id:string}) => row.email,
            // },
            {
              name: 'Status',
              //   @ts-ignore
              selector: (row: bulkOrderType & { id: string }) => (
                <Chip>created</Chip>
              ),
            },
            {
              name: 'Payment',
              //   @ts-ignore
              selector: (row: bulkOrderType & { id: string }) =>
                row.payment?.full.orderId ? (
                  <Chip>{row.payment?.full.status}</Chip>
                ) : (
                  <Chip>{row.payment?.partial.status}</Chip>
                ),
            },
            {
              name: 'Item',
              //   @ts-ignore
              selector: (row: bulkOrderType & { id: string }) => {
                return (
                  <div>
                    {row.products.map((product: any, index: number) => (
                      <ProductCard product={product} />
                    ))}
                  </div>
                );
              },
            },
          ],
          expandableRowsComponent: (order) => (
            <OrdersExpanded order={order.data} />
          ),
        }}
        environment={{
          production: false,
        }}
        loading={false}
        setData={() => void 0}
        setLoading={() => void 0}
        setLinkPaymentModal={() => void 0}
        conditionalRowStyles={[
          {
            when: (row) => row.th_status === 'Created',
            style: {
              backgroundColor: 'white',
              color: 'white',
            },
          },
          {
            when: (row) => row.th_status === 'PRINT',
            style: {
              backgroundColor: 'rgba(248, 148, 6, 0.3)',
            },
          },
          {
            when: (row) => row.th_status === 'PRINTCOMPLETE',
            style: {
              backgroundColor: '#2DCCFF44',
            },
          },
          {
            when: (row) => row.th_status === 'SHIPPED',
            style: {
              backgroundColor: '#56F00044',
            },
          },
        ]}
      />
    </div>
  );
}

export const TH_ORDER_STATUSES = [
  { value: 'CREATED', label: 'Created' },
  { value: 'PRINT', label: 'Ready For Print' },
  { value: 'PRINTCOMPLETE', label: 'Printing Completed' },
  { value: 'SHIPPED', label: 'Shipped' },
];
