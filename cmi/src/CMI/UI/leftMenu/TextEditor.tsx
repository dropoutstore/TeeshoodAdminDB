/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { CMIHooksType } from '../../hooks';
import {
  Button,
  Card,
  Divider,
  Modal,
  NumberInput,
  Slider,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FontsSelector } from './FontsSelector';
import { fontUploadInterface, loadCustomFont } from '@admin/cmifonts';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@admin/configs';
import { IconSearch } from '@tabler/icons-react';
import { ColorPickerComponent } from './colorPicker';
import { CMITextInputForm } from '../../hooks/designHooks.client';

type Props = {
  CMIHooks: CMIHooksType;
};
// @ts-ignore
export interface fontInterfaceType extends fontUploadInterface {
  fontFile: string;
}

export function TextEditor({ CMIHooks }: Props) {
  
  //   const [selectedFont, setSelectedFont] = useState<fontUploadInterface | null>(
  //     null
  //   );
  
 
  const form = useForm<CMITextInputForm>({
    initialValues: {
      text: '',
      fontFamily: null,
      fill: '#000000',
      strokeWidth: 0,
      stroke: '#0000ff',
      fontSize:80
    },
  });

  return (
    <form onSubmit={form.onSubmit((vals)=>{
      // console.log(vals);
      
      CMIHooks.utils.addText(vals.text,vals)
    })} >
      <Textarea minRows={4} {...form.getInputProps('text')} />
      <Divider />
      <div className="pt-4 flex flex-col items-start gap-2">
        <FontsSelector
          // setFontModal={setFontModal}
          selectedFont={form.values.fontFamily}
          setSelectedFont={(font) => form.setFieldValue('fontFamily', font)}
        />
        <ColorPickerComponent
          color={form.values.fill}
          setColor={(c) => form.setFieldValue('fill', c)}
          title="Font Color"
        />

        <ColorPickerComponent
          color={form.values.stroke}
          setColor={(c) => form.setFieldValue('stroke', c)}
          title="Stroke"
        />
        <Text color="primary" size={'sm'} weight={600}>
          Stroke Width
        </Text>
        <div className="grid grid-cols-3 gap-1 items-center">
          <Slider
            className="col-span-2"
            // label="Stroke Width"
            value={form.values.strokeWidth}
            onChange={(v) => form.setFieldValue('strokeWidth', v)}
            min={0}
            max={20}
          />
          <NumberInput
          min={0}
            className="col-span-1"
            // label="Stroke Width"
            {...form.getInputProps('strokeWidth')}
          />
        </div>
        <Text color="primary" size={'sm'} weight={600}>
          Font Size
        </Text>
        <div className="grid grid-cols-3 gap-1 items-center">
          <Slider
            className="col-span-2"
            // label="Stroke Width"
            value={form.values.fontSize}
            onChange={(v) => form.setFieldValue('fontSize', v)}
            min={20}
            max={150}
          />
          <NumberInput
          min={20}
          max={150}
            className="col-span-1"
            // label="Stroke Width"
            {...form.getInputProps('fontSize')}
          />
        </div>
        <div className="text-center">
          <Button type='submit' >Add Text</Button>
        </div>
      </div>
     
    </form>
  );
}
