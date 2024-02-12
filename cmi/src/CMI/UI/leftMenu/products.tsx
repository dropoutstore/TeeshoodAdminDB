import { CMIproductType } from '@admin/meta';
import {
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  Radio,
  Rating,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { productHookType } from '../../hooks/productHooks.client';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import ChangeProduct from './changeProduct';

type Props = {
  productHook: productHookType;
};

export default function Products({ productHook }: Props) {
  const {
    selectedProduct,
    selectedColour,
    setSelectedColour,
    setSelectedProduct,
    selectedGSM,
    setSelectedGSM,
    selectedPrintType,
    setSelectedPrintType,
  } = productHook;
  const [sizeChartModal, setSizeChartModal] = useState(false);
  return (
    <div className="">
      <Title order={4} className="font-bold mb-2">
        {selectedProduct.name}
      </Title>
      <Tooltip label="Rating - 4.5/5">
        <div className="text-sm mb-4">
          <Rating readOnly value={4.5} fractions={2} /> 82 Reviews
        </div>
      </Tooltip>
      <Text dir="column" className="mb-4">
        {selectedProduct.description}
      </Text>
      <div className="text-center pb-4">
        <Button variant="white" onClick={() => setSizeChartModal(true)}>
          Size Chart
        </Button>
      </div>
      <ChangeProduct setSelectedProduct={setSelectedProduct} />
      <Divider className="pb-8" />
      <Radio.Group
        name="GSM"
        label="Select GSM"
        value={selectedGSM.toString()}
        // description="Prices may change according to GSM."
        withAsterisk
        onChange={(v) => setSelectedGSM(parseInt(v))}
      >
        <Group mt="xs">
          {selectedProduct.GSM.map((pType) => (
            <Radio key={pType} value={pType.toString()} label={pType} />
          ))}
        </Group>
      </Radio.Group>
      <Radio.Group
        name="printType"
        label="Select Print Type"
        description="Prices may change according to print type."
        withAsterisk
        value={selectedPrintType}
        onChange={(v) => setSelectedPrintType(v)}
      >
        <Group mt="xs">
          {selectedProduct.printTypes.map((pType) => (
            <Radio key={pType} value={pType} label={pType} />
          ))}
        </Group>
      </Radio.Group>

      <Text dir="column" className="mt-4">
        Color
      </Text>
      <Group spacing="xs" className="mb-4">
        {selectedProduct.colours.map((color) => (
          <Tooltip key={color.colorCode} label={color.name}>
            <Button
              style={{ backgroundColor: color.colorCode }}
              className="border border-solid border-black p-1 w-9"
              onClick={() => setSelectedColour(color)}
            >
              {selectedColour.colorCode === color.colorCode && (
                <IconCheck
                  className="bg-green-400 border-white border border-solid bg-blend-multiply rounded-full p-1"
                  size={20}
                  color="black"
                />
              )}
            </Button>
          </Tooltip>
        ))}
      </Group>
      <Modal opened={sizeChartModal} onClose={() => setSizeChartModal(false)}>
        <div>
          {selectedProduct.printInfo[0]}
          {/* <img src={selectedProduct.printInfo[0]} alt="" /> */}
        </div>
      </Modal>
    </div>
  );
}
