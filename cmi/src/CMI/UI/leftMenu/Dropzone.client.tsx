import { IconUpload, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import './styles.css';
import { List, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

export function DropzoneComponent({
  addImage,
}: {
  addImage: (imageFile: File) => void;
}) {
  // const [imageFile, setImage] = useState('');
  const onDrop = async (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    if (fileRejections.length > 0) {
      showNotification({
        id: 'error',
        message: fileRejections[0].errors[0].message,
        title: 'Error',
        color: 'red',
        icon: <IconX />,
      });
      return;
    }
    const imageFile = acceptedFiles[0];
    addImage(imageFile);
  };

  const { getRootProps, getInputProps } = useDropzone({
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
    <div className="flex hide-scrollbar h-full max-w-lg w-full mx-auto items-center justify-center">
      <div>
        <div
          {...getRootProps()}
          className="flex flex-col items-center p-6 border border-gray-300 border-dashed rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <input {...getInputProps()} />
          <IconUpload className="mb-2" />
          <p className="text-gray-500">
            Drag & drop some files here, or click to select files
          </p>
          <p className="text-gray-500">(max file size = 2mb)</p>
        </div>
        <br />
        <div className="max-h-96 overflow-y-auto pr-6 text-justify">
          <Text className="font-bold">Image Upload Disclaimer:</Text>
          <Text size={'xs'}>
            By uploading images to this platform, you affirm that:
          </Text>
          <List className="text-gray-500 text-left text-xs">
            <List.Item>
              You own the copyright or have the necessary rights for any images
              uploaded.
            </List.Item>
            <List.Item>
              You accept full legal responsibility for any copyright
              infringement or legal issues that may arise from the uploaded
              images.
            </List.Item>
            <List.Item>
              You grant us a royalty-free, worldwide license to use and
              distribute the uploaded content as we see fit.
            </List.Item>
            <List.Item>
              We reserve the right to remove any content at our discretion.
            </List.Item>
            <List.Item>
              By proceeding with uploading, you agree to these terms and assume
              all associated risks.
            </List.Item>
            If uncertain, do not upload images until you have verified your
            rights to use them.
          </List>
        </div>
      </div>
    </div>
  );
}
