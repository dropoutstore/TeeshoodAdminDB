import {IconUpload} from '@tabler/icons-react';
import {useState} from 'react';
import {useDropzone, FileRejection, DropEvent} from 'react-dropzone';
import Notification from '../../../CMI-copy/CMIComponents/Notification';

import {v4 as uid} from 'uuid';
import {CMIObjectType} from '../../hooks/designHooks.client';
import {resizeDimensions} from '../../../CMI-copy/Utils/resizeImageinsideBox';
import {getImageDimensions} from '../../../CMI-copy/Utils/getImageDimensions';
import { CMIProductSide } from '@admin/meta';

export function DropzoneComponent({
  addImage,
  onClose,
  selectedSide
}: {
  addImage: (obj: CMIObjectType) => void;
  onClose: () => void;
  selectedSide:CMIProductSide
}) {
  const [isErrorVisible, setErrorIsVisible] = useState<boolean | string>('');
  // const [imageFile, setImage] = useState('');
  const onDrop = async (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => {
    if (fileRejections.length > 0) {
      setErrorIsVisible(fileRejections[0].errors[0].message);
      return;
    }
    const imageFile = acceptedFiles[0];
    const dimensions = await getImageDimensions(imageFile);
    
    const {width, height} = resizeDimensions(
       selectedSide.w - 10 ,
       selectedSide.h - 10 ,
      dimensions.width,
      dimensions.height,
    );

    addImage({
      src: URL.createObjectURL(imageFile),
      type: 'image',
      height,
      id: uid().toString(),
      rotation: 0,
      width,
      x: (selectedSide.w - width)/2,
      y: (selectedSide.h - height)/2,
    });
    onClose();
    setErrorIsVisible(false);
  };

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
    validator: (file) =>
      file.size / (1024 * 1024 * 2) > 1
        ? {
            code: 'file-too-large',
            message: `size is larger than 2MB.`,
          }
        : null,
  });
  // console.log(imageFile);

  return (
    <div className="flex h-full max-w-lg w-full mx-auto items-center justify-center">
      <div>
        <h2 className="font-bold">Image Upload Disclaimer:</h2>
        By uploading images to this platform, you affirm that:
        <ol type="1" className="text-gray-500 text-justify ">
          <li className="pl-2">
            1. You own the copyright or have the necessary rights for any images
            uploaded.
          </li>
          <li className="pl-2">
            2. You accept full legal responsibility for any copyright
            infringement or legal issues that may arise from the uploaded
            images.
          </li>
          <li className="pl-2">
            3. You grant us a royalty-free, worldwide license to use and
            distribute the uploaded content as we see fit.
          </li>
          <li className="pl-2">
            4.We reserve the right to remove any content at our discretion.
          </li>
          <li className="pl-2">
            5. By proceeding with uploading, you agree to these terms and assume
            all associated risks.
          </li>
          If uncertain, do not upload images until you have verified your rights
          to use them.
        </ol>
        <div
          {...getRootProps()}
          className="flex flex-col items-center m-6 p-6 border border-gray-300 border-dashed rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <input {...getInputProps()} />
          <IconUpload className="mb-2" />
          <p className="text-gray-500">
            Drag & drop some files here, or click to select files
          </p>
          <p className="text-gray-500">(max file size = 2mb)</p>
        </div>
        {/* <GrayButton>
            Cancel
          </GrayButton>
          <GrayButton>
            Accept
          </GrayButton> */}
      </div>

      <Notification
        message={
          typeof isErrorVisible === 'boolean'
            ? 'wrong File Format'
            : isErrorVisible
        }
        isVisible={Boolean(isErrorVisible)}
        setErrorIsVisible={setErrorIsVisible}
      />
    </div>
  );
}
