import {
  ActionIcon,
  Box,
  Button,
  Card,
  ColorInput,
  Grid,
  Modal,
  NumberInput,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useForm as useForm2 } from '@mantine/form';
import { useState } from 'react';
import { CMIProductColour } from '@admin/meta';
import { IconEdit, IconPlus, IconX } from '@tabler/icons-react';
import SideForm from './sideForm';
type Props = {
  colorInfo: CMIProductColour | null;
  onSubmit: (v: CMIProductColour) => void;
  removeItem?: () => void;
};

export default function ColorForm({ colorInfo, onSubmit, removeItem }: Props) {
  const [editModal, setEditModal] = useState(false);
  const form2 = useForm2<CMIProductColour>({
    initialValues: {
      bgColour: '',
      colorCode: '',
      name: '',
      printingCost: {
        DTF: 250,
        DTG: 250,
        embroidery: 250,
        screen: 250,
      },
      sides: [],
    },
  });
  console.log(form2);

  return (
    <Box>
      {colorInfo && removeItem ? (
        <Card withBorder className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button size="xs" bg={colorInfo.colorCode} />
            {colorInfo.name}
          </div>
          <div className="flex">
            <ActionIcon onClick={() => setEditModal(true)}>
              <IconEdit />
            </ActionIcon>
            <ActionIcon onClick={removeItem}>
              <IconX />
            </ActionIcon>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => {
            setEditModal(true);
          }}
        >
          Add Color
        </Button>
      )}
      <Modal size={'xl'} opened={editModal} onClose={() => setEditModal(false)}>
        <form
          onSubmit={form2.onSubmit((values) => {
            console.log('setting', values);

            onSubmit(values);
            setEditModal(false);
          })}
        >
          <TextInput label="Colour Name" {...form2.getInputProps(`name`)} />
          <ColorInput
            label="Colour Code"
            {...form2.getInputProps(`colorCode`)}
          />
          <ColorInput
            label="Background Colour"
            {...form2.getInputProps(`bgColour`)}
          />
          <Grid>
            {/* Printing Cost */}
            <Grid.Col span={3}>
              <NumberInput
                label="DTG Cost"
                {...form2.getInputProps(`printingCost.DTG`)}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="DTF Cost"
                {...form2.getInputProps(`printingCost.DTF`)}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="Screen Cost"
                {...form2.getInputProps(`printingCost.screen`)}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="Embroidery Cost"
                {...form2.getInputProps(`printingCost.embroidery`)}
              />
            </Grid.Col>
          </Grid>
          <br />
          <Grid className="my-2">
            {/* Printing Cost */}
            {form2.values.sides.map((side, index) => (
              <Grid.Col span={3}>
                <SideForm
                  onSubmit={(vals) =>
                    form2.insertListItem('sides', vals, index)
                  }
                  side={side}
                  removeItem={() => form2.removeListItem('sides', index)}
                />
              </Grid.Col>
            ))}
            <Grid.Col span={3}>
              <SideForm
                onSubmit={(vals) => form2.insertListItem('sides', vals)}
                removeItem={() => void 0}
              />
            </Grid.Col>
          </Grid>
          <div className="flex gap-x-4">
            <Button type="submit">Save</Button>
            {/* <Button onClick={() => form.removeListItem(`colours`, index)}>
              remove
            </Button> */}
          </div>
        </form>
      </Modal>
    </Box>
  );
}
