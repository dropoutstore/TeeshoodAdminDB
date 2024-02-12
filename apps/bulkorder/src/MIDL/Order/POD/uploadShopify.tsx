/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  Table,
  Button,
  Group,
  FileInput,
  TextInput,
  Text,
  ActionIcon,
} from '@mantine/core';
import { PODFileColumns, PODTypeSchema } from './column';
import { useForm, yupResolver } from '@mantine/form';
import { DropzoneComponent } from '../ImageUpload';
import { PODFileType, PODType } from './types';
import SelectDesign from './selectDesign';
import { v4 } from 'uuid';
import * as yup from 'yup';
import { AddPODForm } from './addPODForm';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@admin/configs';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../../environment';
import { defaultErrorMessage } from '../../../constants';
import { IconX } from '@tabler/icons-react';
export const UploadPODOrdersTable: React.FC = () => {
  const form = useForm<{
    orders: PODType[];
  }>({
    initialValues: {
      orders: [],
    },
    validate: yupResolver(
      yup.object().shape({ orders: yup.array().of(PODTypeSchema).required() })
    ),
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { companyProfile } = useSelector((state: RootState) => state.Company);

  const handleFileUpload = (file: File) => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data as any[];
          const processedData: PODFileType[] = data.map((row) => {
            const target: any = { orderId: v4().toString(), design: null };
            PODFileColumns.forEach((key) => {
              if (key?.field) target[key.field] = row[key.columnName] ?? '';
            });
            return target;
          });
          form.setFieldValue('orders', processedData);
        },
      });
    }
  };
  const totalPrice = form.values.orders.reduce((sum, curr) => {
    if (curr.design)
      return sum + parseFloat(curr.design.price) * curr.LineitemQuantity;
    else return sum;
  }, 0);
  return (
    <div>
      <div className="p-2 text-right">
        <AddPODForm
          addOrder={(order) => form.insertListItem('orders', order)}
        />
      </div>
      {form.values.orders.length > 0 ? (
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              setLoading(true);
              const res = await addDoc(collection(db, 'POD'), {
                ...values,
                uid: user?.uid,
                companyProfile,
                createdAt: new Date(),
                amount: totalPrice,
                payment: {
                  partial: {
                    amount: parseFloat(totalPrice.toFixed(2)) / 3,
                    status: 'pending',
                  },
                  pendingPayment: {
                    amount: (parseFloat(totalPrice.toFixed(2)) * 2) / 3,
                    status: 'pending',
                  },
                  full: {
                    amount: parseFloat(totalPrice.toFixed(2)),
                    status: 'pending',
                  },
                },
              });
              const { id } = res;
              navigate('/pod/checkout/' + id);
            } catch (error: any) {
              showNotification({
                id: `reg-err-${Math.random()}`,
                autoClose: 5000,
                title: 'Not Authorised!',
                message: environment.production
                  ? defaultErrorMessage
                  : error.message,
                color: 'red',
                icon: <IconX />,
                loading: false,
              });
            } finally {
              setLoading(false);
            }
          })}
        >
          <div className="w-full overflow-x-auto p-4 md:p-8 h-[650px]">
            <Table striped highlightOnHover withBorder className="relative">
              <thead className="sticky z-10 bg-white">
                <tr>
                  <th>Designs</th>

                  {PODFileColumns.map((key) => (
                    <th key={key?.field}>{key?.columnName}</th>
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
                      <SelectDesign
                        order={order}
                        setDesign={(design) =>
                          form.setFieldValue(`orders.${index}.design`, design)
                        }
                        design={order.design}
                      />
                      {form.errors[`orders.${index}.design`] && (
                        <Text color="red">Select Design</Text>
                      )}
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
                          {...form.getInputProps(
                            `orders.${index}.${key.field}`
                          )}
                        />
                      </td>
                    ))}
                    <td>
                      <ActionIcon
                        onClick={() => form.removeListItem('orders', index)}
                        color="red"
                        variant="filled"
                      >
                        <IconX />
                      </ActionIcon>
                    </td>
                    <td />
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="text-center py-4">
            <Button loading={loading} type="submit">
              Create Order ₹{totalPrice}
            </Button>
          </div>
        </form>
      ) : (
        <div className="">
          <DropzoneComponent
            title="Bulk upload Order"
            acceptType={['text/csv']}
            onAccepted={handleFileUpload}
          />
        </div>
      )}
    </div>
  );
};
