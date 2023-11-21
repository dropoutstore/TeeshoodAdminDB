import React, { useState } from 'react';
import { Button, Checkbox, Group, Modal, Select, Text, Title } from '@mantine/core';
import { CMIProductColour, CMIproductType } from '@admin/meta';
import { IconCircleFilled } from '@tabler/icons-react';

type Props = {
  setSelectedProduct: React.Dispatch<React.SetStateAction<CMIproductType>>;
  selectedProduct: CMIproductType;
  setSelectedColor: (color: CMIProductColour) => void;
};

export default function SelectProduct({
  selectedProduct,
  setSelectedColor,
}: Props) {
  // const [modalOpen, setModalOpen] = useState(false);
  const [sizeChartModal, setSizeChartModal] = useState(false);
  const [stitchColor, setStitchColor] = useState('white');
  return (
    // <div className="text-left p-4">
    //   <h6 className="font-bold pt-4 pb-1">{selectedProduct.name}</h6>
    //   <p className="text-sm pt-0 pb-6 text-gray-400 py-4">
    //     {selectedProduct.description}
    //   </p>
    //   <div>
    //     <button
    //       className="underline text-blue-500 my-4"
    //       onClick={() => setSizeChartModal(true)}
    //     >
    //       Size Chart
    //     </button>
    //   </div>
    //   {/* <GrayButton onClick={() => setModalOpen(true)}>change product</GrayButton> */}
    //   <div className="py-4">
    //     <p className="py-2 font-semibold text-gray-500 text-lg">Print Info</p>
    //     <ul>
    //       {selectedProduct.printInfo.map((info) => (
    //         <li key={info}>
    //           <IconCircleFilled size={10} className="inline-block mr-2" />{' '}
    //           {info}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    //   <div className="py-4">
    //     <h6 className="pt-4 pb-1 font-semibold">Select Print </h6>
    //     <div className="flex gap-2 flex-wrap ">
    //       {selectedProduct.printTypes.map((print) => (
    //         <button
    //           key={print}
    //           className="rounded-md border-solid border text-gray-500 hover:bg-green-700 hover:text-white  p-3 font-bold hover:shadow-md"
    //         >
    //           {print}
    //         </button>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="py-4">
    //     <h6 className="pt-4 pb-1 font-semibold">Choose color </h6>
    //     <div className="flex gap-2 flex-wrap ">
    //       {selectedProduct.colours.map((singleColor) => (
    //         <button
    //           key={singleColor.name}
    //           style={{ backgroundColor: singleColor.colorCode }}
    //           onClick={() => {
    //             console.log(singleColor);

    //             setSelectedColor(singleColor);
    //           }}
    //           className={`rounded-md w-8 h-8 hover:shadow-md border-solid border`}
    //         />
    //       ))}
    //     </div>
    //   </div>
    //   {/* <Modal
    //     onClose={() => setModalOpen(false)}
    //     opened={modalOpen}
    //     title="Select Product"
    //     size={"100%"}
    //   >
    //     <div className="flex flex-wrap justify-center gap-4 py-4 rounded-lg">
    //       {CMIproducts.map((product) => (
    //         <div
    //           key={product.name}
    //           onClick={() => {
    //             setSelectedProduct(product);
    //             setModalOpen(false);
    //           }}
    //           className="w-80 cursor-pointer border border-gray-300 border-solid rounded-lg overflow-hidden"
    //         >
    //           <img src={product.featuredImage} width={300} />
    //           <div className="p-4">{product.name}</div>
    //         </div>
    //       ))}
    //     </div>
    //   </Modal> */}
    //   <Modal
    //     onClose={() => setSizeChartModal(false)}
    //     opened={sizeChartModal}
    //     title="Size Chart"
    //   >
    //     <div className="flex flex-wrap justify-center gap-4 py-4 rounded-lg">
    //       size chart
    //     </div>
    //   </Modal>
    // </div>
    <div className="bg-white p-4 shadow-md rounded-lg">
    <Title order={4} className="font-bold mb-2">All-Over Print Unisex Wide-Leg Pants</Title>
    <div className="text-sm mb-4">82 Reviews</div>

    <Button
      variant="outline"
      className="mb-4"
      fullWidth
      onClick={() => console.log('Change product')}
    >
      Change product
    </Button>

    <Text dir="column" className="mb-4">
    {selectedProduct.description}
    </Text>

   
      <Select
        label="Choose size:"
        placeholder="Select size"
        // {...form.getInputProps('size')}
        data={['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL']}
        className="mb-4"
      />

      <Group spacing="xs" className="mb-4">
        <Checkbox
          label="White"
          checked={stitchColor === 'white'}
          onChange={() => setStitchColor('white')}
        />
        <Checkbox
          label="Black"
          checked={stitchColor === 'black'}
          onChange={() => setStitchColor('black')}
        />
      </Group>

      <Button type="submit" className="bg-blue-500 text-white">
        Submit
      </Button>
  </div>
  );
}
