import DesignArea from './UI/Center';
import { TopEditor } from './UI/TopEdit';
import LeftMenu from './UI/leftMenu/LeftMenu';
import useCMIHooks from './hooks';
import { Button } from '@mantine/core';
import { calculatePrice } from './utils/calculatePrice';

export function CMI() {
  const CMIHooks = useCMIHooks();
  const { designHooks } = CMIHooks;
  
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="md:flex block relative">
        <Button size='xl' className="absolute right-0">Checkout ₹{calculatePrice(CMIHooks)}</Button>
        <LeftMenu CMIHooks={CMIHooks} />
        <div className="w-full">
          <TopEditor CMIHooks={CMIHooks} />
          {designHooks.loading ? (
            <div className="w-full h-full" />
          ) : (
            <DesignArea CMIHooks={CMIHooks} />
          )}
        </div>
      </div>
    </div>
  );
}
