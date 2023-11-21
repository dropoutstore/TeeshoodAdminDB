import React, { useState } from 'react';
import GrayButton from './GrayButton';
import { IconEdit } from '@tabler/icons-react';
import { Modal } from '@mantine/core';
// import {Rembg} from 'rembg-node';
// import sharp from 'sharp';
// import {CMIAside} from '~/components/fullpageAside';
// import {Image} from '@shopify/hydrogen';
type Props = {
  image: string;
};

export function RemoveBG({ image }: Props) {
  const [bgRemoveModal, setBgRemoveModal] = useState(false);
  const [transaprentImage, setTransaprentImage] = useState('');

  console.log(image);

  return (
    <div>
      {/* <img src={transaprentImage} alt="" /> */}
      <GrayButton
        onClick={() => setBgRemoveModal(true)}
        className="flex gap-2 mt-2"
      >
        <IconEdit />
        Remove Background
      </GrayButton>
      <Modal opened={bgRemoveModal} onClose={() => setBgRemoveModal(false)}>
        <div className="w-full p-4">
          <img src={transaprentImage ?? image} className="w-full" alt="" />
          <GrayButton onClick={() => console.log('asdasd')}>
            make transparent
          </GrayButton>
        </div>
      </Modal>
    </div>
  );
}
