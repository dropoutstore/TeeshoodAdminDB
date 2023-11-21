import React, {useState} from 'react';
import {ObjectEditor} from './objectEditor.client';
import {CMIObjectType} from '../../../CMI/hooks/designHooks.client';
import GrayButton from '../../CMIComponents/GrayButton';
import {IconEdit, IconFlipVertical, IconUpload} from '@tabler/icons-react';
import {Modal} from '@mantine/core';
import {DropzoneComponent} from '../../../CMI/UI/leftMenu/Dropzone.client';
import {RemoveBG} from '../../CMIComponents/removeBG';
import {CMIProductSide} from '@admin/meta';
import {IconFlipHorizontal} from '@tabler/icons-react';

type Props = {
  selectedObject: CMIObjectType | null;
  onChange: (key: CMIObjectType, resetLoad?: boolean) => void;
  addObject: (obj: CMIObjectType) => void;
  selectedSide: CMIProductSide;
};

export function ImageEditor({
  selectedObject,
  onChange,
  addObject,
  selectedSide,
}: Props) {
  const [uploadImageModal, setUploadImageModal] = useState(false);
  console.log(selectedObject);

  return (
    <div className=" text-center">
      <div className="p-4 border-b-orange-50 border-b border-solid">
        <GrayButton
          onClick={() => setUploadImageModal(true)}
          className="flex gap-2 mx-auto"
        >
          <IconUpload />
          Upload Image
        </GrayButton>
      </div>

      {/* <ObjectEditor selectedObject={selectedObject} onChange={onChange} /> */}
      <Modal
        opened={uploadImageModal}
        onClose={() => setUploadImageModal(false)}
      >
        <DropzoneComponent
          onClose={() => setUploadImageModal(false)}
          addImage={addObject}
          selectedSide={selectedSide}
        />
      </Modal>

      {selectedObject && (
        <div className="w-full max-w-xs mx-auto py-5">
          <label
            htmlFor="custom-range-slider"
            className="block font-medium text-gray-700"
          >
            Direction
          </label>
          <div className="items-center flex gap-4 justify-center">
            <IconFlipHorizontal
              size={24}
              onClick={() => {
                if (selectedObject)
                  onChange(
                    {
                      ...selectedObject,
                      // x: selectedObject.x - selectedSide.lm,
                      // y: selectedObject.y - selectedSide.tm,
                      flipX: !selectedObject.flipX,
                    },
                    false,
                  );
              }}
            />
            <IconFlipVertical
              size={24}
              onClick={() => {
                if (selectedObject)
                  onChange(
                    {
                      ...selectedObject,
                      // x: selectedObject.x - selectedSide.lm,
                      // y: selectedObject.y - selectedSide.tm,
                      flipY: !selectedObject.flipY,
                    },
                    false,
                  );
              }}
            />
          </div>
          {/* <input
              id="custom-range-slider"
              type="range"
              min={-179}
              max={180}
              value={selectedObject?.rotation ?? 0}
             
              className="w-full h-2 inline-block bg-gray-200 rounded-lg appearance-none border-none cursor-pointer "
            /> */}
          <input
            id="custom-range-slider"
            type="number"
            onChange={(e) => {
              console.log('sdvgujsnbdivbsdinv', Number(e.target.value));

              if (selectedObject)
                onChange(
                  {
                    ...selectedObject,
                    // x: selectedObject.x - selectedSide.lm,
                    // y: selectedObject.y - selectedSide.tm,
                    width:
                      Number(e.target.value) > 5 ? Number(e.target.value) : 5,
                  },
                  false,
                );
            }}
            min={-179}
            max={180}
            value={
              selectedObject?.width && selectedObject?.width > 5
                ? selectedObject.width.toString()
                : '5'
            }
            className="w-20 bg-gray-200 rounded-lg inline-block border-none cursor-pointer "
          />
        </div>
      )}

      {selectedObject?.src && (
        <div>
          {/* <RemoveBG image={selectedObject.src} /> */}
          <GrayButton
            onClick={() => setUploadImageModal(true)}
            className="flex gap-2 mt-2 mx-auto"
          >
            <IconEdit />
            Remove Background
          </GrayButton>
        </div>
      )}
    </div>
  );
}
