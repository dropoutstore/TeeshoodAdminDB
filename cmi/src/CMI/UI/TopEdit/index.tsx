import React from 'react';
import { CMIHooksType } from '../../hooks';
import { EditIcon } from './editBaseMobile';
import { Drawer } from '@mantine/core';

type Props = {
  CMIHooks: CMIHooksType;
};

export function TopEditor({ CMIHooks }: Props) {
  const { selectedObject } = CMIHooks.designHooks;
  const EditorIcons = () => {
    switch (selectedObject?.type) {
      case 'image':
        return (
          <>
            {CMIHooks.topTabHooks.editImageItems.map((sections) =>
              sections.items.map((item) => (
                <>
                  <EditIcon CMIHooks={CMIHooks} {...item} />
                  <TopEditWrapper
                    onClose={() => CMIHooks.topTabHooks.setSelectedMenu(null)}
                    opened={CMIHooks.topTabHooks.selectedMenu === item.name}
                    title={item.name}
                  >
                    {item.element}
                  </TopEditWrapper>
                </>
              ))
            )}
            {CMIHooks.topTabHooks.editBaseItems.map((sections) =>
              sections.items.map((item) => (
                <>
                  <EditIcon CMIHooks={CMIHooks} {...item} />
                  <TopEditWrapper
                    onClose={() => CMIHooks.topTabHooks.setSelectedMenu(null)}
                    opened={CMIHooks.topTabHooks.selectedMenu === item.name}
                    title={item.name}
                  >
                    {item.element}
                  </TopEditWrapper>
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
                  <EditIcon CMIHooks={CMIHooks} {...item} />
                  <TopEditWrapper
                    onClose={() => CMIHooks.topTabHooks.setSelectedMenu(null)}
                    opened={CMIHooks.topTabHooks.selectedMenu === item.name}
                    title={item.name}
                  >
                    {item.element}
                  </TopEditWrapper>
                </>
              ))
            )}
            {CMIHooks.topTabHooks.editBaseItems.map((sections) =>
              sections.items.map((item) => (
                <>
                  <EditIcon CMIHooks={CMIHooks} {...item} />
                  <TopEditWrapper
                    onClose={() => CMIHooks.topTabHooks.setSelectedMenu(null)}
                    opened={CMIHooks.topTabHooks.selectedMenu === item.name}
                    title={item.name}
                  >
                    {item.element}
                  </TopEditWrapper>
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
      <div className="h-16 pl-0 md:pl-4">
        <div className="flex gap-x-2 p-2 basis-0 w-full overflow-x-auto">
          <EditorIcons />
        </div>
      </div>
    );
  else return <div className="h-16" />;
}

export const TopEditWrapper = ({
  children,
  opened,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  opened: boolean;
  title: string;
}) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={title}
      position="bottom"
      className="h-16 "
      classNames={{
        content: 'h-48',
        overlay: 'bg-gray-100 bg-opacity-10 ',
        // body: 'shadow-lg',
        title: 'capitalize',
      }}
    >
      <div className="p-4">{children}</div>
    </Drawer>
  );
};
