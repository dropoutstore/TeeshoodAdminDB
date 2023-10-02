
import { db } from '@admin/configs';
import { Button, Checkbox, Modal, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import * as yup from 'yup';
import { defaultErrorMessage } from '../../constants';
import { employeeAccesses } from '.';
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export default function AddEmployee({}: Props) {
  const [modal, setModal] = useState(false);
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
  return (
    <div className=''>
      <Button onClick={() => setModal(true)}>Add Employee</Button>
      <Modal
        centered
        opened={modal}
        onClose={() => setModal(false)}
      >
        <form
          onSubmit={form.onSubmit(async (data) => {
            try {
              setLoading(true);
              await setDoc(doc(collection(db, 'employees'), data.email), { ...data, enabled: true,dashboardAction:"update", searchableName:data.name.toLocaleLowerCase() });
              setLoading(false);
              setModal(false);
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
            placeholder="abc@miurac.com"
            my={16}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="email"
            placeholder="abc@miurac.com"
            my={16}
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
            Add Employee
          </Button>
        </form>
      </Modal>
    </div>
  );
}
