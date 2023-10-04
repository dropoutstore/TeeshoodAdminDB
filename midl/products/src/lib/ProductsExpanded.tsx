import { ActionIcon } from '@mantine/core';
import AddDesign from './addDesign';
import { IconEdit } from '@tabler/icons-react';

type Props = {
  product: any;
};

export interface designType {
  sideName: string;
  GSM: string;
  image: string;
  size: string;
  index?: number;
}

export default function ProductsExpanded({ product }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-green-800">Design Files</h2>
      <AddDesign product={product} />
    </div>
  );
}
