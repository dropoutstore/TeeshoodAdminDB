/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CMIProductColour, CMIProductSide } from '@admin/meta';
import {
  ActionIcon,
  Button,
  FileInput,
  Modal,
  Switch,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { UseFormReturnType, useForm as useForm3 } from '@mantine/form';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { Group, Image, Layer, Rect, Stage, Transformer } from 'react-konva';
import { CMIImageComponent } from './image.client';

type Props = {
  side?: CMIProductSide;
  onSubmit: (vals: CMIProductSide) => void;
  removeItem: () => void;
};

export default function SideForm({ side, onSubmit,removeItem }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  //   const currentSide = form.values.sides[index];
  const form3 = useForm3<CMIProductSide>({
    initialValues: {
      h: 100,
      image: '',
      lm: 100,
      printWidth: 0,
      sideName: '',
      tm: 100,
      w: 100,
      printHeight: 0,
      flip: false,
    },
  });
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  useEffect(() => {
    if (trRef.current && shapeRef.current && form3.values.image) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [trRef, form3.values.image]);
  return (
    <div>
      {side ? (
        <div className="relative">
          <ActionIcon
            className="right-1 absolute"
            color="red"
            variant="filled"
            onClick={removeItem}
          >
            <IconX />
          </ActionIcon>
          <div
            className="absolute z-10 border border-black border-solid"
            style={{
              left: form3.values.lm * 0.3,
              top: form3.values.tm * 0.3,
              width: form3.values.w * 0.3,
              height: form3.values.h * 0.3,
            }}
          />
          <img
            src={side.image}
            style={{
              width: 150,
              height: 150,
            }}
            alt=""
          />
        </div>
      ) : (
        <UnstyledButton
          onClick={() => setModalOpen(true)}
          className="border border-dashed flex justify-center items-center"
          h={250}
          w={250}
        >
          <IconPlus />
        </UnstyledButton>
      )}
      <Modal size={'xl'} opened={modalOpen} onClose={() => setModalOpen(false)}>
        <form className="grid gap-4">
          <TextInput label="side Name" {...form3.getInputProps('sideName')} />
          <div className="flex gap-3">
            <TextInput
              className="w-full"
              label="Print Width"
              {...form3.getInputProps('printWidth')}
            />
            <TextInput
              className="w-full"
              label="Print Height"
              {...form3.getInputProps('printHeight')}
            />
          </div>
          <Switch label="Flip Image" {...form3.getInputProps('flip')} />
          {form3.values.image ? (
            <div>
              <Text weight={500}>Side Image</Text>
              <div className="flex justify-center p-3 relative">
                <ActionIcon
                  className="right-1 absolute"
                  color="red"
                  variant="filled"
                  onClick={() => form3.setFieldValue('image', '')}
                >
                  <IconX />
                </ActionIcon>
                <Stage width={500} height={500}>
                  <Layer>
                    <CMIImageComponent
                      flip={form3.values.flip}
                      src={form3.values.image}
                    />
                  </Layer>
                  <Layer>
                    <Group draggable>
                      <Rect
                        x={form3.values.lm}
                        y={form3.values.tm}
                        width={form3.values.w}
                        height={form3.values.h}
                        stroke="black"
                        ref={shapeRef}
                        onDragEnd={(node) => {
                          form3.setFieldValue('lm', node.target.x());
                          form3.setFieldValue('tm', node.target.y());
                          form3.setFieldValue('w', node.target.width());
                          form3.setFieldValue('h', node.target.height());
                        }}
                      />
                    </Group>
                    <Transformer
                      anchorCornerRadius={8}
                      ref={trRef}
                      rotateEnabled={false}
                      rotationSnaps={[
                        30, 45, 60, 90, 120, 135, 150, 180, 0, -30, -45, -60,
                        -90, -120, -135, -150,
                      ]}
                    />
                  </Layer>
                </Stage>
              </div>
            </div>
          ) : (
            <FileInput
              label="Side Image"
              onChange={(e) => {
                if (e) form3.setFieldValue(`image`, URL.createObjectURL(e));
              }}
            />
          )}
          {/* 
          // @ts-ignore */}
          <Button onClick={()=>{
            form3.onSubmit(onSubmit)()
            form3.reset()
            setModalOpen(false)
            }}>Add</Button>
        </form>
      </Modal>
    </div>
  );
}
