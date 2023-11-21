import React, { useEffect, useState } from 'react';
import {
  CMIProductColour,
  CMIProductSide,
  CMIproductType,
  CMIproducts,
} from '@admin/meta';
export interface productHookType {
  selectedProduct: CMIproductType;
  setSelectedColour: React.Dispatch<React.SetStateAction<CMIProductColour>>;
  setSelectedProduct: React.Dispatch<CMIproductType>;
  selectedColour: CMIProductColour;
  selectedSide: CMIProductSide;
  setSelectedSide: React.Dispatch<CMIProductSide>;
}
export function useProductHooks(product?: CMIproductType):productHookType {
  const [selectedProduct, setSelectedProduct] = useState<CMIproductType>(
    CMIproducts[0]
  );
  const [selectedColour, setSelectedColour] = useState<CMIProductColour>(
    CMIproducts[0].colours[0]
  );
  const [selectedSide, setSelectedSide] = useState<CMIProductSide>(
    CMIproducts[0].colours[0].sides[1]
  );
  useEffect(() => {
    if (selectedProduct) {
      setSelectedColour(selectedProduct.colours[0]);
      setSelectedSide(selectedProduct.colours[0].sides[1]);
    }
  }, [selectedProduct]);
  useEffect(() => {
    if (selectedColour) {
      setSelectedSide(selectedColour.sides[1]);
    }
  }, [selectedColour]);
  useEffect(() => {
    if (product) setSelectedProduct(product);
  }, [product]);

  return {
    selectedProduct,
    setSelectedColour,
    setSelectedProduct,
    selectedColour,
    selectedSide,
    setSelectedSide,
  };
}
