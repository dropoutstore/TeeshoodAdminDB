import { Box, Button, Modal, NumberInput, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React, { useState } from 'react';
import { PODType } from './types';
import { IconPlus } from '@tabler/icons-react';
import { PODFileColumns, PODTypeSchema } from './column';
import SelectDesign from './selectDesign';

type Props = {
  addOrder: (o: PODType) => void;
};

export function AddPODForm({ addOrder }: Props) {
  const form = useForm<PODType>({
    initialValues: {
      BillingAddress1: '',
      BillingAddress2: '',
      BillingCity: '',
      BillingCompany: '',
      BillingCountry: '',
      BillingName: '',
      BillingPhone: '',
      BillingProvince: '',
      BillingProvinceName: '',
      BillingStreet: '',
      BillingZip: '',
      Email: '',
      Id: 0,
      LineitemName: '',
      LineitemQuantity: 0,
      LineitemSku: '',
      Location: '',
      Name: '',
      NoteAttributes: '',
      Notes: '',
      orderId: '',
      Phone: '',
      ReceiptNumber: '',
      ShippingAddress1: '',
      ShippingAddress2: '',
      ShippingCity: '',
      ShippingCompany: '',
      ShippingCountry: '',
      ShippingName: '',
      ShippingPhone: '',
      ShippingProvince: '',
      ShippingProvinceName: '',
      ShippingStreet: '',
      ShippingZip: '',
      Tags: '',
      design: undefined,
    },
    validate: yupResolver(PODTypeSchema),
  });
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Button
        variant="filled"
        onClick={() => setModalOpen(true)}
        rightIcon={<IconPlus />}
      >
        ADD Order
      </Button>
      <Modal title="" opened={modalOpen} onClose={() => setModalOpen(false)}>
        <form
          onSubmit={form.onSubmit(async (vals) => {
            addOrder(vals);
            setModalOpen(false)
          })}
        >
          <Box mb="md">
            <Title order={4}>Add Order</Title>
            <div className="text-center p-4">
              <SelectDesign
                order={form.values}
                setDesign={(design) => form.setFieldValue(`design`, design)}
                design={form.values.design}
              />
            </div>
            {PODFileColumns.map((key) => (
              <TextInput
                label={key.columnName}
                key={key.field}
                {...form.getInputProps(key.field)}
              />
            ))}
          </Box>
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    </div>
  );
}
