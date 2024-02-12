import React, { useEffect, useState } from 'react';
import { PODFileType } from './types';
import { UseFormReturnType } from '@mantine/form';
import { CMIProductDesignType } from '@admin/cmi';
import { ActionIcon, Button, Card, Modal, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@admin/configs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

type Props = {
  order: PODFileType;
  setDesign: (des: CMIProductDesignType) => void;
  design: CMIProductDesignType | null | undefined;
};

export default function SelectDesign({ order, setDesign, design }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [openDesignModal, setOpenDesignModal] = useState(false);
  useEffect(() => {
    if (user.user?.uid && order.LineitemSku) {
      getDocs(
        query(
          collection(db, 'designs'),
          where('productSKU', '==', order.LineitemSku),
          where('uid', '==', user.user.uid)
        )
      ).then((docs) => {
        if (docs.docs.length > 0) {
          setDesign(docs.docs[0].data() as any);
        }
      });
    }
  }, [order.LineitemSku, order.orderId]);

  if (design) {
    return (
      <div>
        <img
          src={design.previews ? design.previews[0] : ''}
          className="w-20"
          alt=""
        />
      </div>
    );
  } else {
    return (
      <>
        <Button
          variant="light"
          size="xs"
          leftIcon={<IconPlus />}
          onClick={() => setOpenDesignModal(true)}
        >
          Add Design
        </Button>
        <Modal
          fullScreen
          opened={openDesignModal}
          onClose={() => setOpenDesignModal(false)}
        >
          <DesignSelector
            onSelect={(des) => {
              setDesign(des);
              setOpenDesignModal(false);
            }}
          />
        </Modal>
      </>
    );
  }
}

export const DesignSelector = ({
  onSelect,
}: {
  onSelect: (design: CMIProductDesignType) => void;
}) => {
  const [designs, setDesigns] = useState<CMIProductDesignType[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user.user?.uid) {
      getDocs(
        query(collection(db, 'designs'), where('uid', '==', user.user.uid))
      )
        .then((docs) => {
          if (docs.docs.length > 0) {
            setDesigns(
              docs.docs.map((d) => d.data()) as CMIProductDesignType[]
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);
  if (loading)
    return (
      <div className="p-4 text-center flex h-full justify-center items-center">
        Loading...
      </div>
    );
  return (
    <div className="p-4 flex gap-4 flex-wrap">
      {designs.length > 0 ? (
        designs.map((design) => (
          <Card
            className="cursor-pointer"
            withBorder
            onClick={() => onSelect(design)}
          >
            <img
              src={design.previews ? design.previews[0] : ''}
              className="w-64"
              alt={design.productName}
            />
            <Text align="center">{design.productName}</Text>
            <Text align="center">{design.sellingPrice}</Text>
            <Text align="center">{design.price}</Text>
          </Card>
        ))
      ) : (
        <div className="p-4 text-center flex h-full justify-center items-center">
          No designs to show
        </div>
      )}
    </div>
  );
};
