import React, { useEffect, useState } from 'react';
import { TableComponent } from '@admin/table-component';
import {  Chip, Skeleton, Title } from '@mantine/core';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@admin/configs';
import OrdersExpanded from './ProductsExpanded';

export function Products() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, 'Product'),
      orderBy('created_at', 'desc'),
      limit(10)
    );

      // getDocs(q).then(docs=>setProducts(docs.docs.map(t=>t.data())))
      // getDocs(collection(db, 'Product')).then(ll=>{console.log("total product",ll.size)})
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((t) => t.data()));
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Title className="">Products</Title>
      <br />
      <TableComponent
        tableProps={{
          data:products,
          columns:[
            {
              name: 'Product ID',
              selector: (row: any) => row.id,
            },
            {
              name: 'Image',
              selector: (row: any) => row.image?.src ? <img src={row.image.src} className='w-12' alt="" /> : <Skeleton className='w-12 h-12' animate={false} />,
            },
            {
              name: 'Title',
              selector: (row: any) => row.title,
            },
           
            {
              name: 'Status',
              selector: (row: any) => row.status,
            },

          ],
          expandableRowsComponent: product => <OrdersExpanded product={product.data} />
        }}
        environment={{  
          production: false,
        }}
        loading={false}
        setData={() => void 0}
       
        setLoading={() => void 0}
        setLinkPaymentModal={() => void 0}
      
      />
    </div>
  );
}

