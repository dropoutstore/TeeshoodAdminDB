/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { CMIHooksType } from '../../hooks';
import { EditIcon } from './editBaseMobile';
import { ActionIcon, Drawer } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import { CropModal } from './cropModal';

type Props = {
  CMIHooks: CMIHooksType;
};

export function TopEditor({ CMIHooks }: Props) {
  const { selectedObject } = CMIHooks.designHooks;
  const matches = useMediaQuery('(min-width: 768px)');
  // const [selectedEditorComponent, setSelectedEditorComponent] = useState<any>();
  const EditorIcons = () => {
    switch (selectedObject?.type) {
      case 'image':
        return (
          <>
            {CMIHooks.topTabHooks.editImageItems.map((sections) =>
              sections.items.map((item) => (
                <>
                  <EditIcon
                    CMIHooks={CMIHooks}
                    {...item}
                    // onClick={() => setSelectedEditorComponent(item.element)}
                  />
                  {/* <TopEditWrapper
                    onClose={() => CMIHooks.topTabHooks.setSelectedMenu(null)}
                    opened={CMIHooks.topTabHooks.selectedMenu === item.name}
                    title={item.name}
                  >
                    {item.element}
                  </TopEditWrapper> */}
                </>
              ))
            )}
            {CMIHooks.topTabHooks.editBaseItems.map((sections) =>
              sections.items.map((item) => (
                <>
                  <EditIcon
                    CMIHooks={CMIHooks}
                    {...item}
                    // onClick={() => setSelectedEditorComponent(item.element)}
                  />
                  {/* <TopEditWrapper
                    onClose={() => CMIHooks.topTabHooks.setSelectedMenu(null)}
                    opened={CMIHooks.topTabHooks.selectedMenu === item.name}
                    title={item.name}
                  >
                    {item.element}
                  </TopEditWrapper> */}
                </>
              ))
            )}
          </>
        );
      case 'text':
        return (
          <>
            {CMIHooks.topTabHooks.editTextItems.map((sections) =>
              sections.items.map((item) => (
                <>
                  <EditIcon
                    CMIHooks={CMIHooks}
                    {...item}
                    // onClick={() => setSelectedEditorComponent(item.element)}
                  />
                  {/* <TopEditWrapper
                    onClose={() => CMIHooks.topTabHooks.setSelectedMenu(null)}
                    opened={CMIHooks.topTabHooks.selectedMenu === item.name}
                    title={item.name}
                  >
                    {item.element}
                  </TopEditWrapper> */}
                </>
              ))
            )}
            {CMIHooks.topTabHooks.editBaseItems.map((sections) =>
              sections.items.map((item) => (
                <>
                  <EditIcon
                    CMIHooks={CMIHooks}
                    {...item}
                    // onClick={() => setSelectedEditorComponent(item.element)}
                  />
                  {/* <TopEditWrapper
                    onClose={() => CMIHooks.topTabHooks.setSelectedMenu(null)}
                    opened={CMIHooks.topTabHooks.selectedMenu === item.name}
                    title={item.name}
                  >
                    {item.element}
                  </TopEditWrapper> */}
                </>
              ))
            )}
          </>
        );
      default:
        return <div />;
    }
  };
  if (CMIHooks.designHooks.selectedObject)
    return (
      <div
        style={{ visibility: matches ? 'hidden' : 'visible' }}
        className="h-16 pl-0 md:pl-4"
      >
        {CMIHooks.topTabHooks.selectedMenu ? (
          <div className="flex items-center w-full justify-between">
            {
              CMIHooks.topTabHooks.editBaseItems
                .reduce((acc: any, curr) => acc.concat(curr.items), [])
                .find((t: any) => t.name === CMIHooks.topTabHooks.selectedMenu)
                ?.element
            }
            {CMIHooks.topTabHooks.editImageItems
              .reduce((acc: any, curr) => acc.concat(curr.items), [])
              .find((t: any) => t.name === CMIHooks.topTabHooks.selectedMenu)
              ?.element ?? ''}
            {CMIHooks.topTabHooks.editTextItems
              .reduce((acc: any, curr) => acc.concat(curr.items), [])
              .find((t: any) => t.name === CMIHooks.topTabHooks.selectedMenu)
              ?.element ?? ''}
           
            {/* {selectedEditorComponent} */}
            <ActionIcon
              onClick={() => CMIHooks.topTabHooks.setSelectedMenu(null)}
            >
              <IconX />
            </ActionIcon>
          </div>
        ) : (
          <div className="flex gap-x-2 p-2 basis-0 w-full overflow-x-auto">
            <EditorIcons />
            {CMIHooks.topTabHooks.cropModal &&
              selectedObject &&
              selectedObject.type === 'image' && (
                <CropModal
                  closeModal={() => CMIHooks.topTabHooks.setCropModal(null)}
                  imageSrc={CMIHooks.topTabHooks.cropModal}
                  setImageFunc={(img) => {
                    CMIHooks.designHooks.setSelectObject({
                      ...selectedObject,
                      src: img,
                    });
                    CMIHooks.designHooks.setLoading(true);
                    CMIHooks.topTabHooks.setCropModal(null);
                  }}
                  imgShape={{
                    height: selectedObject.height,
                    width: selectedObject.width,
                  }}
                />
              )}
          </div>
        )}
      </div>
    );
  else return <div className="h-16" />;
}

// export const TopEditWrapper = ({
//   children,
//   opened,
//   onClose,
//   title,
// }: {
//   children: React.ReactNode;
//   onClose: () => void;
//   opened: boolean;
//   title: string;
// }) => {
//   return (
//     <Drawer
//       opened={opened}
//       onClose={onClose}
//       title={title}
//       position="bottom"
//       className="h-16 "
//       classNames={{
//         content: 'h-48',
//         overlay: 'bg-gray-100 bg-opacity-10 ',
//         // body: 'shadow-lg',
//         title: 'capitalize',
//       }}
//     >
//       <div className="p-4">{children}</div>
//     </Drawer>
//   );
// };
