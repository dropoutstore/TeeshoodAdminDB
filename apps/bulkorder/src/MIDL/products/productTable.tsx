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
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import useProductsHook, { productType } from './productsHook';
export function ProductTable() {
    // const { user } = useSelector((state: RootState) => state.user);
   const {products} = useProductsHook()
  return (
         <div className="overflow-auto">
      
      <br />
      <div className="flex justify-center p-3">
        <SegmentedControl className="self-center" data={TH_PRODUCT_STATUSES} />
      </div>
      <TableComponent
        tableProps={{
          data: products,
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
              selector: (row: productType) => '#' + row.id,
              maxWidth: '60px',
            },
            {
              name: 'Order name',
              selector: (row: productType) => row.name,
            },
            {
              name: 'Phone',
              //   @ts-ignore
              selector: (row: productType) => (
                <Text className="w-fit">{row.category}</Text>
              ),
            },
            // {
            //   name: 'Email',
            //   selector: (row: bulkOrderType & {id:string}) => row.email,
            // },
            {
              name: 'Status',
              //   @ts-ignore
              selector: (row: productType) => (
                <Chip>created</Chip>
              ),
            },
            {
              name: 'Payment',
              //   @ts-ignore
              selector: (row: productType) =>
                row.designs
            },
           
          ],
        //   expandableRowsComponent: (order) => (
        //     <OrdersExpanded order={order.data} />
        //   ),
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
  )
}



// export function BulkOrdersTable() {
 
//   const [orders, setOrders] = useState<any[]>([]);


//   return (
//     <div className="overflow-auto">
//       <Title className="">Orders</Title>
//       <br />
//       <div className="flex justify-center p-3">
//         <SegmentedControl className="self-center" data={TH_ORDER_STATUSES} />
//       </div>
//       <TableComponent
//         tableProps={{
//           data: orders,
//           columns: [
//             // name?: string | number | React.ReactNode;
//             // sortField?: string;
//             // cell?: (row: T, rowIndex: number, column: TableColumn<T>, id: string | number) => React.ReactNode;
//             // conditionalCellStyles?: ConditionalStyles<T>[];
//             // format?: Format<T> | undefined;
//             // selector?: Selector<T>;
//             // sortFunction?: ColumnSortFunction<T>;
//             {
//               name: 'Order ID',
//               selector: (row: productType) => '#' + row.id,
//               maxWidth: '60px',
//             },
//             {
//               name: 'Order name',
//               selector: (row: productType) => row.orderName,
//             },
//             {
//               name: 'Phone',
//               //   @ts-ignore
//               selector: (row: productType) => (
//                 <Text className="w-fit">{row.address.phoneNumber}</Text>
//               ),
//             },
//             // {
//             //   name: 'Email',
//             //   selector: (row: bulkOrderType & {id:string}) => row.email,
//             // },
//             {
//               name: 'Status',
//               //   @ts-ignore
//               selector: (row: productType) => (
//                 <Chip>created</Chip>
//               ),
//             },
//             {
//               name: 'Payment',
//               //   @ts-ignore
//               selector: (row: productType) =>
//                 row.payment?.full.orderId ? (
//                   <Chip>{row.payment?.full.status}</Chip>
//                 ) : (
//                   <Chip>{row.payment?.partial.status}</Chip>
//                 ),
//             },
//             {
//               name: 'Item',
//               //   @ts-ignore
//               selector: (row: productType) => {
//                 return (
//                   <div>
//                     {row.products.map((product: any, index: number) => (
//                       <ProductCard product={product} />
//                     ))}
//                   </div>
//                 );
//               },
//             },
//           ],
//           expandableRowsComponent: (order) => (
//             <OrdersExpanded order={order.data} />
//           ),
//         }}
//         environment={{
//           production: false,
//         }}
//         loading={false}
//         setData={() => void 0}
//         setLoading={() => void 0}
//         setLinkPaymentModal={() => void 0}
//         conditionalRowStyles={[
//           {
//             when: (row) => row.th_status === 'Created',
//             style: {
//               backgroundColor: 'white',
//               color: 'white',
//             },
//           },
//           {
//             when: (row) => row.th_status === 'PRINT',
//             style: {
//               backgroundColor: 'rgba(248, 148, 6, 0.3)',
//             },
//           },
//           {
//             when: (row) => row.th_status === 'PRINTCOMPLETE',
//             style: {
//               backgroundColor: '#2DCCFF44',
//             },
//           },
//           {
//             when: (row) => row.th_status === 'SHIPPED',
//             style: {
//               backgroundColor: '#56F00044',
//             },
//           },
//         ]}
//       />
//     </div>
//   );
// }

export const TH_PRODUCT_STATUSES = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'ARCHIVED', label: 'Archived' },
];
