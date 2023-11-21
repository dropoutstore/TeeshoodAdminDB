import { Group, Text, Title, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { environment } from '../../environment';
import { defaultErrorMessage } from '../../constants';

export function ImageUpload({
  title,
  onAccepted,
}: {
  title?: string;
  onAccepted: (file: File) => void;
}) {
  return (
    <Dropzone
      onDrop={(files) => onAccepted(files[0])}
      onReject={(files) =>
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Error',
          message: environment.production
            ? defaultErrorMessage
            : 'file not accepted.',
          color: 'red',
          icon: <IconX />,
          loading: false,
        })
      }
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group
        className="justify-center text-center"
        mih={220}
        style={{ pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <Title order={4}>{title}</Title>
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
          <Title order={4}>{title}</Title>
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
      </Group>
    </Dropzone>
  );
}
