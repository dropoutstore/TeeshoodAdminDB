/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Table, Button, Group, FileInput, TextInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { PODFileColumns } from './column';
import { useForm } from '@mantine/form';
import { DropzoneComponent } from '../ImageUpload';
import { PODFileType } from './types';

export const UploadPODOrdersTable: React.FC = () => {
  const form = useForm<{ orders: PODFileType[] }>({
    initialValues: {
      orders: [],
    },
  });

  const handleFileUpload = (file: File) => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data as any[];

          const processedData: PODFileType[] = data.map((row) => {
            const target: any = {};
            PODFileColumns.forEach((key) => {
              target[key.field] = row[key.columnName];
            });
            return target;
          });
          form.setFieldValue('orders', processedData);
        },
      });
    }
  };
  console.log(form.values.orders);

  return (
    <div>
      <div className="w-full overflow-x-auto p-4 md:p-8 max-h-screen">
        {form.values.orders.length > 0 ? (
          <Table striped highlightOnHover withBorder>
            <thead>
              <tr>
                <th
                // className="fixed z-10"
                >
                  Designs
                </th>
                {/* <th>
                  <div className="w-48" />
                </th> */}
                {PODFileColumns.map((key) => (
                  <th key={key.field}>{key.columnName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {form.values.orders.map((order, index) => (
                <tr key={index} className="h-72">
                  <td
                  // className="fixed w-96 z-10"
                  >
                    {/* <Button>Add Design</Button> */}
                    <img src={'https://picsum.photos/200/300'} alt="" />
                  </td>
                  {/* <td>
                    <div className="w-48"></div>
                  </td> */}
                  {PODFileColumns.map((key) => (
                    <td>
                      {/* 
                                // @ts-ignore */}
                      <TextInput
                        className="w-full min-w-max"
                        key={key.field}
                        {...form.getInputProps(`orders.${index}.${key.field}`)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="">
            <DropzoneComponent
              title="Bulk upload Order"
              acceptType={['text/csv']}
              onAccepted={handleFileUpload}
            />
            {/* <FileInput
              placeholder="Upload a CSV file"
              label="Shopify Order file"
              accept=".csv"
              color="blue"
              onChange={handleFileUpload}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};
