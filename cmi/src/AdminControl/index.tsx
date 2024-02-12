/* eslint-disable @typescript-eslint/ban-ts-comment */
import { db } from '@admin/configs';
import { CMIproductType } from '@admin/meta';
import { TableComponent } from '@admin/table-component';
import { ActionIcon, Button, Chip, Title } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function CMIProductsList() {
  const navigate = useNavigate();
  const [cmiProducts, setCmiProducts] = useState<any[]>([]);
  useEffect(() => {
    const q = collection(db, 'meta');

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCmiProducts(snapshot.docs.map((t) => t.data()));
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);
  return (
    <div className='p-4' >
        <Title className=""> CMI Products</Title>
      <br />
      <div className="flex justify-end">
        <Link to={'add'}>

        <Button>Add</Button>
        </Link>
      </div>
      <TableComponent
        environment={{
          production: false,
        }}
        tableProps={{
          columns: [
            {
              name: 'Image',
              selector: (row: CMIproductType & { id: string }) =>
                row.featuredImage,
              maxWidth: '60px',
            },
            {
              name: 'Name',
              selector: (row: CMIproductType & { id: string }) => row.name,
            },
            {
              name: 'actions',
              //   @ts-ignore
              selector: (row: CMIproductType & { id: string }) => (
                <ActionIcon
                  className="w-fit"
                  onClick={() => {
                    navigate(`/settings/edit/${row.id}`);
                  }}
                >
                  <IconEdit />
                </ActionIcon>
              ),
            },
            // {
            //   name: 'Email',
            //   selector: (row: bulkOrderType & {id:string}) => row.email,
            // },
        
          ],
          data: cmiProducts,
        }}
        loading={false}
      />
    </div>
  );
}
