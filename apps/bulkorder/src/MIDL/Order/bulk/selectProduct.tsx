import { CMIproductType, CMIproducts } from '@admin/meta';
import { Text } from '@mantine/core';

type Props = {
  selectProduct: React.Dispatch<React.SetStateAction<CMIproductType | null>>;
};

export function SelectProduct({ selectProduct }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl gap-4 w-full mx-auto">
      {CMIproducts.map((product) => (
        <div
          onClick={() => selectProduct(product)}
          className="hover:shadow-md rounded-xl p-4 cursor-pointer"
        >
          <div>
            <img
              className="max-w-sm mx-auto w-full"
              src={product.featuredImage}
              alt="featured"
            />
          </div>
          <div>
            <Text>{product.name}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}
