/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { TableComponent } from '@admin/table-component';
import { Chip, Title, Text } from '@mantine/core';
import {
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
// import { ProductCard, PODOrderType } from './BulkOrder';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { PODOrderType } from './types';

export function PODOrdersTable() {
  const { user } = useSelector((state: RootState) => state.user);
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    if (user?.uid) {
      const q = query(
        collection(db, 'POD'),
        // orderBy('createdAt', 'desc'),
        where('uid', '==', user.uid),
        limit(10)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(snapshot.docs.map((t) => ({ ...t.data(), id: t.id })));
      });

      // Cleanup function
      return () => unsubscribe();
    }
  }, []);

  return (
    <div className="overflow-auto">
      <Title className=""> POD Orders</Title>
      <br />

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
              selector: (row: PODOrderType & { id: string }) => '#' + row.id,
              maxWidth: '60px',
            },
            {
              name: 'Order name',
              selector: (row: PODOrderType & { id: string }) => row.id,
            },
            {
              name: 'Phone',
              //   @ts-ignore
              selector: (row: PODOrderType & { id: string }) => (
                <Text className="w-fit">{row.companyProfile?.phoneNumber}</Text>
              ),
            },
            // {
            //   name: 'Email',
            //   selector: (row: PODOrderType & {id:string}) => row.email,
            // },
            {
              name: 'Status',
              //   @ts-ignore
              selector: (row: PODOrderType & { id: string }) => (
                <Chip>created</Chip>
              ),
            },
            {
              name: 'Payment',
              //   @ts-ignore
              selector: (row: PODOrderType & { id: string }) =>
                row.payment?.full.orderId ? (
                  <Chip>{row.payment?.full.status}</Chip>
                ) : (
                  <Chip>{row.payment?.partial.status}</Chip>
                ),
            },
            {
              name: 'Items',
              //   @ts-ignore
              selector: (row: PODOrderType & { id: string }) => {
                return <div>{row.orders.length} items</div>;
              },
            },
          ],
          expandableRowsComponent: (order:{data:PODOrderType}) => (
            <OrdersExpanded PODOrder={order.data} />
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
