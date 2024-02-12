/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Grid, Modal, Text, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { CMIHooksType } from '../hooks';
import { Preview } from './preview/preview';
import { useForm, yupResolver } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconCheck, IconX } from '@tabler/icons-react';
import { calculatePrice } from '../utils/calculatePrice';
import { uploadImageToFirebase } from '../utils/uploadToStorage';
import * as yup from 'yup';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '@admin/configs';
import { useSelector } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import { CMISideDesignType } from '../hooks/designHooks.client';
import { CMIProductColour, CMIProductSide, CMIproductType } from '@admin/meta';
import { v4 } from 'uuid';
type Props = {
  CMIHooks: CMIHooksType;
};

export interface CMIProductDesignType {
  previews: string[] | null;
  designs: CMISideDesignType;
  selectedProduct: {
    selectedProduct: CMIproductType;
    selectedColour: CMIProductColour;
    selectedSide: CMIProductSide;
    selectedGSM: number;
    selectedPrintType: string;
  };
  productName: string;
  productSKU: string;
  price: string;
  sellingPrice: string;
}

export function Export({ CMIHooks }: Props) {
  const {
    designHooks: { designs },
    productHooks,
  } = CMIHooks;
  const {user} = useSelector((state: any) => state.user);
  const { companyProfile } = useSelector((state: any) => state.Company);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [previewMode, setPreviewMode] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<CMIProductDesignType>({
    initialValues: {
      previews: null,
      designs,
      selectedProduct: {
        selectedProduct: productHooks.selectedProduct,
        selectedColour: productHooks.selectedColour,
        selectedSide: productHooks.selectedSide,
        selectedGSM: productHooks.selectedGSM,
        selectedPrintType: productHooks.selectedPrintType,
      },
      productName: '',
      productSKU: '',
      price: calculatePrice(CMIHooks),
      sellingPrice: '',
    },
    validate: yupResolver(
      yup.object().shape({
        // previews: yup.array(yup.string()),
        designs: yup.object().required(),
        selectedProduct: yup.object().required(),
        productName: yup.string().required(),
        productSKU: yup.string().required(),
        price: yup.string().required(),
        sellingPrice: yup.number().required(),
      })
    ),
  });
  //   useEffect(() => {
  //     if (previewMode) {
  //       const getPreviews = async () => {
  //         const previewImages = [];
  //         for (const sideRef of previewMode) {
  //           const p = await sideRef.current.toDataURL();
  //           previewImages.push(p);
  //         }
  //         form.setFieldValue('previews', previewImages);
  //       };
  //       getPreviews();
  //     } else {
  //       form.setFieldValue(
  //         'previews',
  //         Object.keys(designs).map((s) => '')
  //       );
  //     }
  //   }, [previewMode]);
  console.log(user);

  return (
    <>
      <Button
        size={isDesktop ? 'lg' : 'sm'}
        variant="gradient"
        className="absolute right-0"
        rightIcon={<IconArrowRight />}
        onClick={() =>
          setPreviewMode(Object.keys(designs).map(() => React.createRef()))
        }
      >
        Checkout ₹{calculatePrice(CMIHooks)}
      </Button>
      <Modal
        opened={Boolean(previewMode)}
        fullScreen
        onClose={() => setPreviewMode(null)}
      >
        <form
          onSubmit={form.onSubmit(async (vals) => {
            setLoading(true);
            try {
              if (!previewMode) return;
              const previewUrls = [];
              for (const [index, sideRef] of previewMode.entries()) {
                const dataurl = await sideRef.current.toDataURL();
                const p = await uploadImageToFirebase(
                  dataurl,
                  `/CMIPreview/${user.uid}/${vals.productName}-${
                    CMIHooks.productHooks.selectedColour.sides[index].sideName
                  }.${v4()}.png`
                );
                previewUrls.push(p);
              }
              addDoc(collection(db, 'designs'), {
                ...vals,
                uid: user.uid,
                companyProfile,
                previews: previewUrls,
              });
              showNotification({
                id: `reg-err-${Math.random()}`,
                autoClose: 5000,
                title: 'Success',
                message: 'Design Added successfully',
                color: 'green',
                icon: <IconCheck />,
                loading: false,
              });
              setTimeout(() => {
                window.location.reload();
                form.reset();
                setPreviewMode(null);
              }, 5000);
            } catch (error: any) {
              showNotification({
                id: `reg-err-${Math.random()}`,
                autoClose: 5000,
                title: 'Error!',
                message: error.message,
                color: 'red',
                icon: <IconX />,
                loading: false,
              });
            } finally {
              setLoading(false);
            }
          })}
          className="p-2 md:p-4 max-w-2xl mx-auto grid gap-3"
        >
          <Grid>
            {CMIHooks.productHooks.selectedColour.sides.map((side, index) => (
              <Grid.Col xs={12} md={6}>
                {previewMode && (
                  <Preview
                    stageRef={previewMode[index]}
                    scaleFactor={0.6}
                    selectedSide={side}
                    objects={designs[side.sideName]}
                  />
                )}
                <Text align="center">{side.sideName}</Text>
              </Grid.Col>
            ))}
          </Grid>
          <TextInput
            name="productName"
            label="Product Name"
            {...form.getInputProps('productName')}
          />
          <TextInput
            name="sku"
            label="Product SKU"
            {...form.getInputProps('productSKU')}
          />
          <TextInput
            name="price"
            label="Selling Price"
            {...form.getInputProps('sellingPrice')}
          />
          <Button loading={loading} type="submit">
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
}
