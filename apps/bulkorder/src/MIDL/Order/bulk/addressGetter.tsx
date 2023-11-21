import React, { useState } from 'react';
import { addressType } from '../../companyProfile/form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { ActionIcon, Card, Modal, Text, Title } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { AddNewAddress } from './addNewAddress';

type Props = {
  selectAddress: (address: addressType) => void;
  selectedAddress: addressType;
};

export function AddressGetter({ selectAddress, selectedAddress }: Props) {
  const { companyProfile } = useSelector((state: RootState) => state.Company);
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Text size={'sm'} className="p-2" weight={600}>
        Delivering To
      </Text>
      <div onClick={() => setOpened(true)}>
        <AddressComponent selected={true} address={selectedAddress} />
      </div>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Title order={5} className="px-2">
          Choose Delivery address
        </Title>
        <div className="py-4 px-2">
          <AddNewAddress
            selectAddress={(address) => {
              selectAddress(address);
              setOpened(false);
            }}
          />
          {companyProfile?.address.map((address) => (
            <div
              onClick={() => {
                selectAddress(address);
                setOpened(false);
              }}
            >
              <AddressComponent address={address} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export const AddressComponent = ({
  address,
  selected,
}: {
  address: addressType;
  selected?: boolean;
}) => (
  <Card
    className={`border-solid border flex items-center cursor-pointer ${
      selected
        ? 'bg-blue-100 border-blue-600 text-blue-600'
        : ' border-gray-400'
    } my-4 rounded-lg`}
  >
    <div className="flex-grow">
      <Text>
        {address.addressLine1},{address.addressLine2}
      </Text>
      <Text>
        {address.city},{address.state}
      </Text>
    </div>
    {selected && (
      <ActionIcon color={selected ? 'blue' : 'dark'}>
        <IconEdit />
      </ActionIcon>
    )}
  </Card>
);
