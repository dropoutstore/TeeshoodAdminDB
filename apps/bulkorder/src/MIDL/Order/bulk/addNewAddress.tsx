/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Autocomplete, Button, Modal, TextInput } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import {
  addressSchema,
  addressType,
  indianState,
} from '../../companyProfile/form';
import { useForm, yupResolver } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@admin/configs';
import { setCompany } from '../../companyProfile/reduxSlice';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../../environment';
import { defaultErrorMessage } from '../../../constants';

export function AddNewAddress({
  selectAddress,
}: {
  selectAddress?: (address: addressType) => void;
}) {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const form = useForm<addressType>({
    initialValues: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      landmark: '',
      phoneNumber: '',
      state: '',
      pincode: '',
    },
    validate: yupResolver(addressSchema),
  });
  const { user } = useSelector((state: RootState) => state.user);
  const { companyProfile } = useSelector((state: RootState) => state.Company);
  return (
    <>
      <Button
        onClick={() => setOpened(true)}
        leftIcon={<IconPlus />}
        variant="outline"
        fullWidth
      >
        Add new Address
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              await updateDoc(doc(collection(db, 'reseller'), user?.uid), {
                address: arrayUnion(values),
              });
              dispatch(
                setCompany({
                  ...companyProfile,
                  //   @ts-ignore
                  address: [...companyProfile.address, values],
                })
              );
              if (selectAddress) selectAddress(values);
              form.reset()
              setOpened(false)
            } catch (error: any) {
              showNotification({
                id: `reg-err-${Math.random()}`,
                autoClose: 5000,
                title: 'Error',
                message: environment.production
                  ? defaultErrorMessage
                  : error.message,
                color: 'red',
                icon: <IconX />,
                loading: false,
              });
            }
          })}
        >
          <TextInput
            className="m-2 col-span-2"
            name={'addressLine1'}
            label={'Address Line1'}
            {...form.getInputProps('addressLine1')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'addressLine2'}
            label={'Address Line2'}
            {...form.getInputProps('addressLine2')}
          />

          <TextInput
            className="m-2 col-span-2"
            name={'landmark'}
            label={'Landmark'}
            {...form.getInputProps('landmark')}
          />
          <TextInput
            className="m-2 col-span-2 md:col-span-1"
            name={'city'}
            label={'City'}
            {...form.getInputProps('city')}
          />
          <Autocomplete
            className="m-2 col-span-2 md:col-span-1"
            data={indianState}
            name={'state'}
            label={'State'}
            {...form.getInputProps('state')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'phoneNumber'}
            label={'Phone Number'}
            {...form.getInputProps('phoneNumber')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'pincode'}
            label={'pincode'}
            {...form.getInputProps('pincode')}
          />
          <Button className="m-2 col-span-2" type="submit">
            Add Address
          </Button>
        </form>
      </Modal>
    </>
  );
}
