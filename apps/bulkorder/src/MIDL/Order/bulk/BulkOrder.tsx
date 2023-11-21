import {
  ActionIcon,
  Button,
  Card,
  Modal,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import { BulkOrderProduct, bulkOrderProductSchema } from './bulkOrderUtils';
import { addressSchema, addressType } from '../../companyProfile/form';
import { BulkOrderForm } from './BulkOrderForm';
import { AddressGetter } from './addressGetter';
import { functions } from '@admin/configs';
import { httpsCallable } from 'firebase/functions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../../environment';
import { defaultErrorMessage } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { calcBulkOrderPrice } from './productForm';
import * as yup from 'yup';
export interface bulkOrderType {
  orderName: string;
  products: BulkOrderProduct[];
  address: addressType;
  payment?: {
    partial: {
      amount: number;
      status: bulkOrderPaymentStatuses;
      orderId?:string
    };
    pendingPayment: {
      amount: number;
      status: bulkOrderPaymentStatuses;
      orderId?:string
    };
    full: {
      amount: number;
      status: bulkOrderPaymentStatuses;
      orderId?:string
    };
  };
}
export type bulkOrderPaymentStatuses = 'pending' | 'success';
export function BulkOrder() {
  const [opened, setOpened] = useState(false);
  const { companyProfile } = useSelector((state: RootState) => state.Company);
  const { user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm<bulkOrderType>({
    initialValues: {
      address: companyProfile?.address[0] as addressType,
      orderName: '',
      products: [],
    },
    validate: yupResolver(
      yup.object().shape({
        orderName: yup.string().required(),
        products: yup.array().of(bulkOrderProductSchema).required(),
        address: addressSchema.required(),
      })
    ),
  });
  return (
    <div>
      <Button
        className="col-span-1 h-28 md:h-48"
        fullWidth
        size="xl"
        variant="light"
        onClick={() => setOpened(true)}
        leftIcon={<IconPlus />}
      >
        Bulk Order
      </Button>
      <Modal opened={opened} onClose={() => setOpened(false)} fullScreen>
        <form
          onSubmit={form.onSubmit(async (values) => {
            const bulkOrderFunc = httpsCallable(functions, 'bulkOrdersSet');
            setLoading(true);
            try {
              const { id } = (
                await bulkOrderFunc({
                  order: { ...values, resellerId: user?.uid },
                })
              ).data as { id: string };
              navigate(`/bulk/checkout/${id}`);
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
            } finally {
              setLoading(false);
            }
          })}
          className="max-w-lg mx-auto"
        >
          <Title align="center" order={2} className="pb-8">
            Place Bulk Order
          </Title>

          <TextInput
            className="m-2 col-span-2"
            name={'orderName'}
            description="Provide a name for your Order"
            label={'Order Name'}
            {...form.getInputProps('orderName')}
          />
          <AddressGetter
            selectedAddress={form.values.address}
            selectAddress={(address) => form.setFieldValue('address', address)}
          />
          <Text size={'sm'} className="p-2" weight={600}>
            Products
          </Text>
          <div className="">
            {form.values.products.map((product, index) => (
              <ProductCard
                product={product}
                removeProduct={() => form.removeListItem('products', index)}
              />
            ))}
          </div>
          <BulkOrderForm
            addProduct={(product: BulkOrderProduct) =>
              form.setFieldValue(
                `products.${form.values.products.length}`,
                product
              )
            }
          />
          <div className="py-4">
            <Button loading={loading} type="submit">
              Checkout
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export const ProductCard = ({
  product,
  removeProduct,
}: {
  product: BulkOrderProduct;
  removeProduct?: (product?: BulkOrderProduct) => void;
}) => {
  const sizePrices = product.sizePricing.filter(
    (sizePrize) => sizePrize.units > 0
  );
  return (
    <Card withBorder className="my-2 flex flex-wrap gap-2 relative">
      {removeProduct && (
        <ActionIcon
          className="absolute right-1 top-1 z-10"
          color="red"
          variant="filled"
          onClick={() => removeProduct(product)}
        >
          <IconX />
        </ActionIcon>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[210px]">
        {product.product?.colours
          .find((pcolor) => pcolor.name === product.color)
          ?.sides.map((side) => (
            <div className="relative">
              {product.designs.find(
                (sideDesign) => sideDesign.sideName === side.sideName
              )?.design && (
                <div
                  className="absolute"
                  style={{
                    top: side.tm / 5,
                    left: side.lm / 5,
                    width: side.w / 5,
                    height: side.h / 5,
                  }}
                >
                  <img
                    src={
                      product.designs.find(
                        (sideDesign) => sideDesign.sideName === side.sideName
                      )?.design
                    }
                    // className=""
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    alt={side.sideName}
                  />
                </div>
              )}
              <img src={side.image} className="w-[100px]" alt={side.sideName} />
            </div>
          ))}
      </div>
      <div className="flex-grow">
        <Text weight={600} size={'md'}>
          {product.product?.name}
        </Text>
        <Text color="dimmed">{product.color}</Text>
        <div className="grid grid-cols-3 pt-3 w-full text-left gap-2">
          {sizePrices.map((sizePrice) => (
            <>
              <div>{sizePrice.size}</div>
              <div>
                {sizePrice.units} x ₹{sizePrice.pricePerUnit}
              </div>
              <div>
                ₹{(sizePrice.units * sizePrice.pricePerUnit).toFixed(2)}
              </div>
            </>
          ))}
        </div>
      </div>
      <Text color="indigo" className="h-full w-full">
        Total: ₹{calcBulkOrderPrice(sizePrices)}
      </Text>
    </Card>
  );
};
