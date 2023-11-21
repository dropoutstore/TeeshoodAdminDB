import { IconShirt } from '@tabler/icons-react';
import {LeftMenuButton} from '../../CMIComponents/LeftMenuButton.client';
import {leftTabType} from '../../../CMI/hooks/leftTabHooks.client';

export function SelectProducts({
  setOpenedTab,
}: {
  setOpenedTab: React.Dispatch<React.SetStateAction<leftTabType>>;
}) {
 
  return (
    <>
      {/* <button onClick={()=>setModalOpen(true)} className="p-4 hover:bg-gray-100 border-b border-solid border-gray-100 cursor-pointer">
        Select Product
      </button> */}

      <LeftMenuButton onClick={() => setOpenedTab('product')}>
        <IconShirt />
        Select Product
      </LeftMenuButton>
    </>
  );
}
