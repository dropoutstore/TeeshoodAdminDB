import { Button, Checkbox, Modal, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { employeeAccesses, staffType } from '.';
import * as yup from 'yup';
import { collection, doc, setDoc } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { db } from '@admin/configs';
import { defaultErrorMessage } from '../../constants';

type Props = {
  data: staffType;
  setData: any;
};

export default function EditEmployee({ data, setData }: Props) {
  const [loading, setLoading] = useState(false);
  const form = useForm<{
    email: string;
    name: string;
    access: string[];
  }>({
    initialValues: {
      email: '',
      name: '',
      access: [],
    },
    validate: yupResolver(
      yup.object({
        email: yup
          .string()
          .email('email must be abc@email.com')
          .required('email is required'),
        name: yup.string().required('name is required'),
        access: yup.array(yup.string()),
      })
    ),
  });
  useEffect(() => {
    if (data) {
      form.setValues(data);
    } else {
      form.reset();
    }
  }, [data]);

  return (
    <Modal
      centered
      opened={Boolean(data)}
      onClose={() => setData(null)}
    >
      <form
        onSubmit={form.onSubmit(async (formData) => {
          try {
            setLoading(true);
            await setDoc(doc(collection(db, 'employees'), formData.email), { ...formData, enabled: data.enabled,dashboardAction:"update", searchableName: formData.name.toLocaleLowerCase() });
            setLoading(false);
            setData(null);
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Success',
              message: 'Added successfully',
              color: 'green',
              icon: <IconX />,
              loading: false,
            });
          } catch (err) {
            console.log(err);
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Error',
              message: defaultErrorMessage,
              color: 'red',
              icon: <IconX />,
              loading: false,
            });
          }
        })}
      >
        <TextInput
          label="name"
          placeholder="abc@example.com"
          my={16}
          disabled
          {...form.getInputProps('name')}
        />
        <TextInput
          label="email"
          placeholder="abc@example.com"
          my={16}
          disabled
          {...form.getInputProps('email')}
        />
        <Checkbox.Group
          value={form.values.access}
          onChange={(v) => form.setFieldValue('access', v)}
        >
          {employeeAccesses.map(({ label, value }) => (
            <Checkbox key={label} value={value} label={label} />
          ))}
        </Checkbox.Group>
        <br />
        <Button loading={loading} type="submit">
          Update
        </Button>
      </form>
    </Modal>
  );
}
