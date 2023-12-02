/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { FontUpload, fontUploadInterface } from './FontUpload';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@admin/configs';
import DataTable from 'react-data-table-component';
import { ActionIcon, Paper, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
export const fontCollectionRef = collection(db, 'fonts');
export function CMIFonts() {
  const [fonts, setFonts] = useState<fontUploadInterface[]>([]);
  useEffect(() => {
    getDocs(fontCollectionRef).then((collectionRef) => {
      setFonts(
        collectionRef.docs.map((d) => d.data()) as fontUploadInterface[]
      );
    });
  }, []);
  return (
    <div className="p-4">
      <FontUpload />
      <br />
      <Paper className="p-4 md:p-8">
        <Title order={4} align="center" pt={16}>
          Fonts
        </Title>
        {/* <div /> */}
        <TextInput
          label="Search Font"
          className="max-w-xs"
          placeholder="Ariel,Roboto,..."
          rightSection={
            <ActionIcon>
              <IconSearch />
            </ActionIcon>
          }
        />
        <br />
        <DataTable
          className="border border-solid border-gray-200"
          columns={[
            {
              name: 'Name',
              selector: (row: fontUploadInterface) => row.name,
            },
            {
              name: 'preview',
              // @ts-ignore
              selector: (row: fontUploadInterface) => (
                <img src={row.preview ?? ''} alt={row.name} />
              ),
            },
          ]}
          data={fonts}
        />
      </Paper>
    </div>
  );
}
