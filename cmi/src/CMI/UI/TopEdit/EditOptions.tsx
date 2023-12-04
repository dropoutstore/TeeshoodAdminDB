/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { CMIHooksType } from '../../hooks';
import { ActionIcon, Text, Tooltip } from '@mantine/core';
import { CropModal } from './cropModal';
import { ImageBGRemover } from './removeBG';

type Props = {
  CMIHooks: CMIHooksType;
};

export function EditOptions({ CMIHooks }: Props) {
  const { selectedObject } = CMIHooks.designHooks;
  //   const { updateObject } = CMIHooks.utils;
  console.log(selectedObject);
  switch (selectedObject?.type) {
    case 'text':
      return (
        <div className="grid gap-y-6">
          {CMIHooks.topTabHooks.editTextItems.map((section) => (
            <>
              <Text className="font-semibold">{section.section}</Text>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) =>
                  item.element ? (
                    item.element
                  ) : (
                    <Tooltip label={item.label}>
                      <ActionIcon onClick={item.onClick} className="m-1"  variant="outline">
                        {item.icon}
                      </ActionIcon>
                    </Tooltip>
                  )
                )}
              </div>
            </>
          ))}
          <EditBase CMIHooks={CMIHooks} />
        </div>
      );
    case 'image':
      return (
        <div className="grid gap-y-6">
          {CMIHooks.topTabHooks.editImageItems.map((section) => (
            <>
              <Text className="font-semibold">{section.section}</Text>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) =>
                  item.element ? (
                    item.element
                  ) : (
                    <Tooltip label={item.label}>
                      <ActionIcon onClick={item.onClick} className="m-1"  variant="outline">
                        {item.icon}
                      </ActionIcon>
                    </Tooltip>
                  )
                )}
              </div>
            </>
          ))}
          <EditBase CMIHooks={CMIHooks} />
          {CMIHooks.topTabHooks.cropModal && (
            <CropModal
              closeModal={() => CMIHooks.topTabHooks.setCropModal(null)}
              imageSrc={CMIHooks.topTabHooks.cropModal ?? ''}
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
          {/* {CMIHooks.topTabHooks.removeBgModal && (
            <ImageBGRemover imageUrl={CMIHooks.topTabHooks.removeBgModal} />
          )} */}
        </div>
      );

    default:
      return <></>;
  }
}

export const EditBase = ({ CMIHooks }: Props) => {
  return (
    <>
      {CMIHooks.topTabHooks.editBaseItems.map((section) => (
        <>
          <Text className="font-semibold">{section.section}</Text>
          <div className="flex flex-wrap gap-2">
            {section.items.map((item) =>
              item.element ? (
                item.element
              ) : (
                <Tooltip label={item.label}>
                  <ActionIcon onClick={item.onClick} className="m-1"  variant="outline">
                    {item.icon}
                  </ActionIcon>
                </Tooltip>
              )
            )}
          </div>
        </>
      ))}
    </>
  );
};
