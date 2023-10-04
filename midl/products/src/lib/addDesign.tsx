import { db } from '@admin/configs';
import { MiuracImage } from '@admin/table-component';
import {
  ActionIcon,
  Button,
  Modal,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconEdit, IconPlus, IconX } from '@tabler/icons-react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { defaultErrorMessage } from '../../../../apps/super-admin/src/constants';
import { environment } from '../../../../apps/super-admin/src/environment';
import { designType } from './ProductsExpanded';
import ProductDesigns from './designs';
type Props = {
  product: any;
};

export default function AddDesign({ product }: Props) {
  const [designModal, setDesignModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<null | designType>(null);
  const form = useForm<designType>({
    initialValues: {
      sideName: '',
      GSM: '',
      image: '',
      size: '',
    },
  });

  useEffect(() => {
    if (selectedDesign) form.setValues(selectedDesign);
    else form.reset();
  }, [selectedDesign]);
  console.log(selectedDesign);

  return (
    <>
      <div className="grid justify-items-center grid-cols-1 lg:grid-cols-2 text-center py-8 max-w-6xl mx-auto">
        <ProductDesigns
          designs={product.designs}
          action={(d) => {
            setSelectedDesign(d);
            setDesignModal(true);
          }}
        />
        <UnstyledButton
          onClick={() => setDesignModal(product)}
          className="w-48 h-48 border border-dashed flex items-center justify-center"
        >
          <IconPlus />
        </UnstyledButton>
      </div>
      <Modal
        fullScreen
        opened={designModal}
        onClose={() => setDesignModal(false)}
      >
        <form
          onSubmit={form.onSubmit(async (values) => {
            setLoading(true);
            const targetDoc = doc(
              collection(db, 'Product'),
              product.id.toString()
            );
            try {
              if (
                selectedDesign &&
                (selectedDesign.index || selectedDesign.index === 0)
              ) {
                const target = [...product.designs];
                const check = [...product.designs];
                check.splice(selectedDesign.index, 1);
                console.log(check);

                if (check?.find((t: any) => t.sideName === values.sideName)) {
                  notifications.show({
                    message: environment.production
                      ? JSON.stringify('Side Name already exist')
                      : defaultErrorMessage,
                  });
                } else {
                  target.splice(selectedDesign.index, 1, values);
                  await updateDoc(targetDoc, {
                    designs: target,
                  });
                  setDesignModal(false);
                  setSelectedDesign(null);
                }
              } else {
                if (
                  !product.designs ||
                  !product.designs?.find(
                    (t: any) => t.sideName === values.sideName
                  )
                ) {
                  if (Array.isArray(product.designs)) {
                    await updateDoc(targetDoc, {
                      designs: [...product.designs, values],
                    });
                  } else {
                    await updateDoc(targetDoc, { designs: [values] });
                  }
                  form.reset();
                  setDesignModal(false);
                } else {
                  notifications.show({
                    message: environment.production
                      ? JSON.stringify('Side Name already exists')
                      : defaultErrorMessage,
                  });
                }
              }
            } catch (error: any) {
              notifications.show({
                message: environment.production
                  ? JSON.stringify(error.message)
                  : defaultErrorMessage,
              });
            } finally {
              setLoading(false);
            }
          })}
        >
          {product.image?.src && (
            <div>
              <img
                className="block mx-auto w-60"
                src={product.image.src}
                alt=""
              />
            </div>
          )}
          <Title align="center" order={3}>
            {product.title}
          </Title>

          <div className="max-w-md w-full mx-auto">
            <div className="grid grid-cols-1 gap-4">
              <TextInput
                label="Side"
                placeholder="Front / Back / Left sleeve / right sleeve"
                {...form.getInputProps('sideName')}
              />
              <TextInput
                label="GSM"
                placeholder="200 / 300 / 350"
                {...form.getInputProps('GSM')}
              />
              <TextInput
                label="Size"
                placeholder="A4 / A3 / 13 in X 18 in"
                {...form.getInputProps('size')}
              />
              <Text>Design Image</Text>
              {form.values.image ? (
                <div className="relative min-w-fit ">
                  <div className="relative box-content">
                    <ActionIcon
                      onClick={() => form.setFieldValue('image', '')}
                      className="absolute right-1 top-1"
                      variant="filled"
                      color="red"
                    >
                      <IconX />
                    </ActionIcon>
                  </div>
                  <img src={form.values.image} className="w-48" alt="" />
                </div>
              ) : (
                <MiuracImage
                  updateFirestore={true}
                  editConfig={null}
                  allowMultiple={false}
                  setUrlFunc={async (url: string | string[]) => {
                    if (!Array.isArray(url)) {
                      form.setFieldValue('image', url);
                    }
                  }}
                  buttonComponent={
                    <UnstyledButton className="w-24 h-24 border border-dashed flex items-center justify-center">
                      <IconPlus />
                    </UnstyledButton>
                  }
                />
              )}
              <Button color="dark" loading={loading} type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
