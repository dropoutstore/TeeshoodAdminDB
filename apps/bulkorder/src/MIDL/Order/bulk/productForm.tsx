/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import {
  BulkOrderProduct,
  Design,
  SizePricing,
  bulkOrderProductSchema,
} from './bulkOrderUtils';
import { useForm, yupResolver } from '@mantine/form';
import { CMIproductType } from '@admin/meta';
import {
  ActionIcon,
  Button,
  Chip,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import { ImageUpload } from '../ImageUpload';
import { convertImageToDataURI } from './imageToDataUri';
import BulkDesign from './Design';


type Props = {
  product: CMIproductType;
  selectProduct: React.Dispatch<React.SetStateAction<CMIproductType | null>>;
  addProduct: (product: BulkOrderProduct) => void;
};

export default function ProductForm({
  product,
  selectProduct,
  addProduct,
}: Props) {
  const form2 = useForm<BulkOrderProduct>({
    initialValues: {
      color: product.colours[0].name,
      designs: [],
      gsm: 250,
      sizePricing: product.sizes.map(({ size, price }) => ({
        size,
        units: 0,
        pricePerUnit: price,
      })),
      printType: 'DTF',
      product: null,
      specialInstructions: '',
    },
    validate: yupResolver(bulkOrderProductSchema),
  });
  useEffect(() => {
    form2.setFieldValue('product', product);

    return () => {
      form2.setFieldValue('product', null);
    };
  }, [product]);

  useEffect(() => {
    if (form2.values.color) {
      form2.setFieldValue(
        'designs',
        product.colours
          .find((col) => col.name === form2.values.color)
          ?.sides.map(({ sideName }) => ({ design: '', sideName })) as Design[]
      );
    }
  }, [form2.values.color]);
  console.log(form2.errors);
  
  return (
    <div className="relative">
      <ActionIcon
        className="absolute -top-8 left-8"
        onClick={() => selectProduct(null)}
      >
        <IconArrowLeft />
      </ActionIcon>
      <Title className="my-10" order={2}>
        {product.name}
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-3 md:col-span-1">
          <img
            src={product.featuredImage}
            className="w-full max-w-[200px] md:max-w-sm mx-auto block"
            alt="selected product"
          />
        </div>
        <div className=" col-span-3 md:col-span-2">
          {/* <form
            onSubmit={}
          > */}
          <div className="max-w-4xl w-full text-left my-6 mx-auto bg-slate-100 rounded-xl p-6">
            {/* <TextInput
              className="m-2 col-span-2"
              name={'orderName'}
              description="Provide a name for your Order"
              label={'Order Name'}
              {...form2.getInputProps('productName')}
            /> */}

            <div className="m-2 flex gap-2 flex-wrap">
              <Select
                data={product.GSM.map((t) => t.toString())}
                // className="m-2 col-span-2"
                name={'GSM'}
                label={'GSM'}
                {...form2.getInputProps('gsm')}
              />
              <Select
                data={product.printTypes}
                // className="m-2 col-span-2"
                name={'printType'}
                label={'Print Type'}
                {...form2.getInputProps('printType')}
              />
            </div>

            <div className="m-2">
              <Text className="text-sm font-semibold">Color</Text>
              <div className="m-2 flex gap-2 flex-wrap">
                {product.colours.map((color) => (
                  <Chip
                    key={color.bgColour}
                    value={color.name}
                    onChange={(checked) => {
                      if (checked) form2.setFieldValue('color', color.name);
                    }}
                    // className={`bg-[${color.colorCode}]`}
                    classNames={{ input: `bg-[${color.colorCode}]` }}
                    checked={color.name === form2.values.color}
                  >
                    {color.name}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 text-left my-6 mx-auto bg-slate-100 rounded-xl p-6">
            <BulkDesign product={product} />
            {/* {form2.values.designs.map(({ sideName, design }, index) => (
              <div className="p-4" key={sideName}>
                {design ? (
                  <div className="text-center relative">
                    <ActionIcon
                      className="absolute right-0"
                      variant="filled"
                      color="red"
                      onClick={() =>
                        form2.setFieldValue(`designs.${index}`, {
                          sideName,
                          design: '',
                        })
                      }
                    >
                      <IconX />
                    </ActionIcon>
                    <img className=" h-72" src={design} alt={sideName} />
                    <Text className="py-2" color="cyan">
                      {sideName}
                    </Text>
                  </div>
                ) : (
                  <ImageUpload
                      title={sideName}
                      onAccepted={async(file) =>
                        form2.setFieldValue(`designs.${index}`, {
                          sideName,
                          design: await convertImageToDataURI(file),
                        })
                      }
                    />
                )}
              </div>
            ))} */}
               <Text color='red' >
                      {form2.errors[`designs`]}
                    </Text>
          </div>
          <div className="max-w-4xl w-full text-left my-6 mx-auto bg-slate-100 rounded-xl p-6">
            <div className="grid grid-cols-3 ">
              <Text className="text-center" color="cyan" weight={600} size={18}>
                Size
              </Text>
              <Text className="text-center" color="cyan" weight={600} size={18}>
                Price
              </Text>
              <Text className="text-center" color="cyan" weight={600} size={18}>
                Total
              </Text>
              {product.sizes.map(({ size, price }, index) => (
                <React.Fragment key={size}>
                  <TextInput
                    className="m-2 "
                    name={size}
                    label={size}
                    {...form2.getInputProps(`sizePricing.${index}.units`)}
                  />
                  <Text className="justify-self-center self-center">
                    ₹{price}
                  </Text>
                  <Text className="justify-self-center self-center">
                    ₹{price * form2.values.sizePricing[index].units}
                  </Text>
                </React.Fragment>
              ))}
              <div />
              <div />
              <Text className="text-center" weight={600} size={24}>
                Total : {calcBulkOrderPrice(form2.values.sizePricing)}
              </Text>
            </div>
            <Text color='red' >
                      {form2.errors[`sizePricing`]}
                    </Text>
          </div>

          <Button
            // @ts-ignore
            onClick={form2.onSubmit(async (values, e) => {
              // e.preventDefault();
              // e.persist();
              addProduct(values);
              selectProduct(null);
            })}
            size="xl"
            type="submit"
          > 
            Add Products
          </Button>
        </div>
      </div>
    </div>
  );
}

export const calcBulkOrderPrice = (sizePrices: SizePricing[]) =>
  sizePrices
    .map(({ units, pricePerUnit }) => units * pricePerUnit)
    .reduce((partialSum, a) => partialSum + a, 0);
