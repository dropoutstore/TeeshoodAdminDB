import { Title } from '@mantine/core';
import DesignArea from './UI/Center';
import LeftMenu from './UI/leftMenu/LeftMenu';
import { CMISideDesignType, useDesignHooks } from './hooks/designHooks.client';
import { useProductHooks } from './hooks/productHooks.client';
import { useEffect } from 'react';
import { testObjects } from './hooks/testObjects';

export function CMI() {
  const productHooks = useProductHooks();
  const designHooks = useDesignHooks();

  useEffect(() => {
    if (productHooks.selectedColour) {
      const initDesigns: CMISideDesignType = {};
      for (const side of productHooks.selectedColour.sides) {
        initDesigns[side.sideName] = [];
      }
      designHooks.setDesigns(initDesigns);
      designHooks.setLoading(false)
    }
  }, [productHooks.selectedColour]);

  return (
    <div className="bg-white p-4 rounded-lg">
      <Title align="center" order={4} className="pt-4 pb-8 md:pl-96">
        Design Product
      </Title>
      <div className="md:flex block">
        <LeftMenu productHook={productHooks} designHooks={designHooks} />
        {designHooks.loading ?<div className='w-full h-full' />: <DesignArea productHook={productHooks} designHooks={designHooks} />}
      </div>
    </div>
  );
}
