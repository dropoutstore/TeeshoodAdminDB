import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  NumberInput,
  Group,
  Button,
  MultiSelect,
  ColorInput,
  Grid,
  Checkbox,
  Box,
  Title,
  Text,
  Card,
  ActionIcon,
  Textarea,
} from '@mantine/core';
import { CMIproductType } from '@admin/meta';
import { MiuracImage } from '@admin/table-component';
import { IconX } from '@tabler/icons-react';
import ColorForm from './colorForm';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@admin/configs';
export const CMIProductForm = () => {
  const form = useForm<CMIproductType>({
    initialValues: {
      name: '',
      description: '',
      basePrice: 0,
      productCode: '',
      sizes: [],
      GSM: [],
      printInfo: [],
      colours: [],
      featuredImage: '',
      printTypes: [],
    },
  });
  const navigate = useNavigate()
  const {id} = useParams()
  const handleSubmit = (values: CMIproductType) => {
    if(id)
    console.log('handle', values);
  };
  useEffect(() => {
    if(id){
      getDoc(doc(collection(db,'meta'),id)).then(docref=>{
        if(docref.exists()){
          form.setValues(docref.data())
        }else{
          navigate('/settings')
        }
      })
    }
  }, [id])
  return (
    <div>
      <form
        className="max-w-xl mx-auto grid gap-4 p-2"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        {/* basic info */}
        <Card className="p-8">
          <Title order={4} align="center">
            Add/Edit product
          </Title>
          <Text className="my-2 font-semibold text-lg">Basic Info</Text>
          <TextInput label="Name" {...form.getInputProps('name')} />
          <Textarea
            label="Description"
            {...form.getInputProps('description')}
          />
          <NumberInput
            label="Base Price"
            {...form.getInputProps('basePrice')}
          />
          <TextInput
            label="Product Code"
            {...form.getInputProps('productCode')}
          />

          <MultiSelect
            label="Print Info"
            data={form.values.printInfo}
            {...form.getInputProps('printInfo')}
          />
          <div className="py-2">
            <Text size={'sm'}>Featured Image</Text>
            {form.values.featuredImage ? (
              <div className="relative">
                <ActionIcon
                  color="red"
                  variant="filled"
                  className=""
                  onClick={() => form.setFieldValue('featuredImage', '')}
                >
                  <IconX />
                </ActionIcon>
                <img
                  className="w-full"
                  src={form.values.featuredImage}
                  alt="featured"
                />
              </div>
            ) : (
              <MiuracImage
                updateFirestore={true}
                editConfig={null}
                setUrlFunc={(url) => {
                  if (!Array.isArray(url))
                    form.setFieldValue('featuredImage', url);
                }}
              />
            )}
          </div>
          {/* <Select
          label="Print Types"
          data={['DTG', 'DTF', 'Screen']}
          {...form.getInputProps('printTypes')}
        /> */}
        </Card>
        {/* GSM */}
        <Card className="p-8">
          <Text className="my-2 font-semibold text-lg">GSM</Text>
          {form.values.GSM.map((__, i) => (
            <div className="flex items-end gap-2">
              <NumberInput {...form.getInputProps(`GSM.${i}`)} />
              <ActionIcon
                color="red"
                variant="filled"
                onClick={() => form.removeListItem('GSM', i)}
              >
                <IconX />
              </ActionIcon>
            </div>
          ))}
          <br />
          <Button onClick={() => form.insertListItem('GSM', '')}>
            Add GSM
          </Button>
        </Card>
        {/* <TextInput
          label="Featured Image"
          {...form.getInputProps('featuredImage')}
        /> */}

        {/* Sizes */}
        <Card className="p-8">
          <Text className="my-2 font-semibold text-lg">Sizes</Text>
          {form.values.sizes.map((_, index) => (
            <Grid key={index}>
              <Grid.Col span={6}>
                <TextInput
                  label="Size"
                  {...form.getInputProps(`sizes.${index}.size`)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-end">
                  <NumberInput
                    label="Price"
                    {...form.getInputProps(`sizes.${index}.price`)}
                  />
                  <ActionIcon
                    color="red"
                    onClick={() => form.removeListItem('sizes', index)}
                  >
                    <IconX />
                  </ActionIcon>
                </div>
              </Grid.Col>
            </Grid>
          ))}
          <br />
          <Button
            onClick={() => form.insertListItem('sizes', { size: '', price: 0 })}
          >
            Add Size
          </Button>
        </Card>

        {/* Colours */}
        <Card className="p-8">
          <Text className="my-2 font-semibold text-lg">Colours</Text>

          <br />
          {/* <Button onClick={() => form.insertListItem('GSM', '')}>Add GSM</Button> */}
          {form.values.colours.map((colour, index) => (
            <ColorForm
              colorInfo={colour}
              onSubmit={(val) => form.insertListItem(`colours`, val, index)}
              removeItem={() => form.removeListItem(`colours`, index)}
            />
          ))}
          <ColorForm
            colorInfo={null}
            onSubmit={(val) => form.insertListItem(`colours`, val)}
          />
        </Card>
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
};
