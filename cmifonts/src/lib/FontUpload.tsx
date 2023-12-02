/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { Dropzone } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { setDoc, doc } from 'firebase/firestore';
import { storage } from '@admin/configs';
import {
  ActionIcon,
  Button,
  LoadingOverlay,
  Modal,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconPhoto, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import DataTable from 'react-data-table-component';
import { FontPreview } from './FontPreview';
import { fontCollectionRef } from '.';
export interface fontUploadInterface {
  name: string;
  fontFile: File;
  search: string;
  extension: string;
  preview?: string;
  status?:"active" | "disabled"
}
export function FontUpload() {
  const [uploading, setUploading] = useState(false);
  const [fontFiles, setFontFiles] = useState<fontUploadInterface[]>([]);
  const [previews, setPreviews] = useState<{ [fontName: string]: string }>({});
  const uploadFonts = async () => {
    setUploading(true);

    const updatedFontFiles = [...fontFiles];
    const updatedPreviews = { ...previews };

    for (const [index, file] of fontFiles.entries()) {
      const storageRef = ref(storage, `fonts/${file.name}.${file.extension}`);
      try {
        const snapshot = await uploadBytes(storageRef, file.fontFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await setDoc(doc(fontCollectionRef, file.name), {
          name: file.name,
          url: downloadURL,
          status: 'active',
          preview: previews[file.name],
          extension: file.extension,
          search: file.search,
        });
        showNotification({
          title: 'Upload successful',
          message: `${file.name} uploaded successfully`,
        });

        // Update the local copies
        delete updatedPreviews[file.name];
        updatedFontFiles.splice(index, 1);
      } catch (error) {
        showNotification({
          title: 'Upload failed',
          message: `Failed to upload ${file.name}`,
          color: 'red',
        });
      }
    }

    // Update the state once after loop completion
    setFontFiles(updatedFontFiles);
    setPreviews(updatedPreviews);
    setUploading(false);
  };

  return (
    <>
      <Dropzone
        onDrop={(files) => {
          setFontFiles(
            files.map((f) => ({
              fontFile: f,
              name: f.name.split('.')[0],
              extension: f.name.split('.')[0],
              preview: '',
              search: f.name.toLowerCase(),
            }))
          );
        }}
        onReject={() =>
          showNotification({
            id: `reg-err-${Math.random()}`,
            autoClose: 5000,
            title: 'Not Authorised!',
            message: 'Upload only font files',
            color: 'red',
            icon: <IconX />,
            loading: false,
          })
        }
        maxSize={1 * 1024 ** 2}
        maxFiles={50}
        accept={['font/ttf', 'font/otf']}
      >
        <div
          className="flex flex-col justify-center items-center h-56 "
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-dimmed)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </div>
      </Dropzone>
      <Modal
        fullScreen
        opened={fontFiles.length > 0}
        onClose={() => setFontFiles([])}
      >
        <div className="p-4">
          <Title order={6} align="center">
            Font Upload
          </Title>
          <DataTable
            title="Uploaded Fonts"
            paginationPerPage={50}
            columns={[
              {
                name: 'Name',
                selector: (row: fontUploadInterface) => row.name,
              },
              {
                name: 'preview',
                // @ts-ignore
                selector: (row: fontUploadInterface) => (
                  <FontPreview
                    fontName={row.name}
                    fontURL={URL.createObjectURL(row.fontFile)}
                    addImagePreview={(preview: string, fontName: string) => {
                      setPreviews((t) => ({ ...t, [fontName]: preview }));
                    }}
                    preview={previews[row.name]}
                  />
                ),
              },
              {
                name: <div className="text-red-600">Delete</div>,
                // @ts-ignore
                selector: (row: fontUploadInterface, index: number) =>
                  previews[row.name] && (
                    <ActionIcon
                      color="red"
                      onClick={() => {
                        const copyFonts = [...fontFiles];
                        copyFonts.splice(index, 1);
                        const copyPreviews = { ...previews };
                        delete copyPreviews[row.name];
                        setFontFiles(copyFonts);
                        setPreviews(copyPreviews);
                      }}
                    >
                      <IconTrash />
                    </ActionIcon>
                  ),
              },
            ]}
            data={fontFiles}
            pagination
          />
          <div className="text-center p-4">
            <Button
              loading={uploading}
              onClick={uploadFonts}
              rightIcon={<IconUpload />}
            >
              Upload
            </Button>
          </div>
        </div>
        <LoadingOverlay visible={uploading} />
      </Modal>
    </>
  );
}
