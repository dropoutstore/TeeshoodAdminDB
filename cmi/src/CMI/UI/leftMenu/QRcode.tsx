import { useRef, useState } from 'react';
import { Button, ColorPicker, Text, Textarea } from '@mantine/core';
import { QRCode } from 'react-qrcode-logo';
import { IconArrowRight } from '@tabler/icons-react';
import { CMIHooksType } from '../../hooks';
import { ColorPickerComponent } from './colorPicker';
type Props = {
  CMIHooks: CMIHooksType;
};

export default function QRcode({ CMIHooks }: Props) {
  const [qrValue, setQrValue] = useState('');
  const [color, setColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const qrRef = useRef<any>(null);
  const addQr = () => {
    if (!qrValue) return;
    const canvas = qrRef.current.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    CMIHooks.utils.addImage(image);
  };
  return (
    <div className="text-center grid gap-4">
      <Text>Add QR</Text>
      {qrValue && (
        <div ref={qrRef}>
          <QRCode value={qrValue} fgColor={color} bgColor={bgColor} />
        </div>
      )}
      <div className="flex gap-2 justify-center">
        <ColorPickerComponent title="Color" color={color} setColor={setColor} />
        <ColorPickerComponent
          title="Background color"
          color={bgColor}
          setColor={setBgColor}
        />
      </div>

      <Textarea
        minRows={3}
        placeholder="Enter text for QR code"
        label="QR Code Text"
        value={qrValue}
        onChange={(event) => setQrValue(event.currentTarget.value)}
        className="mb-4"
      />

      <Button
        fullWidth={false}
        disabled={!qrValue}
        rightIcon={<IconArrowRight />}
        onClick={addQr}
      >
        Insert QR
      </Button>
    </div>
  );
}
