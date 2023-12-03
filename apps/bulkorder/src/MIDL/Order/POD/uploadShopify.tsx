/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Table, Button, Group, FileInput, TextInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { PODOrderColumns, PODOrderSelectedColumns } from './column';
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
          // @ts-ignore
          const processedData: PODOrder[] = data.map((row) => {
            const target: any = {};
            PODOrderColumns.forEach((key) => {
              target[key] = row[key];
            });
            return target;
          });
          // @ts-ignore
          form.setFieldValue('orders', processedData);
        },
      });
    }
  };

  return (
    <div>
      <div className="w-full overflow-x-auto p-4 md:p-8 max-h-screen">
        {form.values.orders.length > 0 ? (
          <Table striped highlightOnHover withBorder>
            <thead>
              <tr>
                {PODOrderColumns.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {form.values.orders.map((order, index) => (
                <tr key={index}>
                  {PODOrderColumns.map((key, index) => (
                    <td>
                      {/* 
                                // @ts-ignore */}
                      <TextInput
                        className="w-full min-w-max"
                        key={key}
                        {...form.getInputProps(`orders.${index}.${key}`)}
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
