/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CMIHooksType } from '../../hooks';
import { ActionIcon, Tooltip } from '@mantine/core';



export const EditIcon = ({
  icon,
  name,
  onClick,
  CMIHooks,
  label,
}: {
  icon: JSX.Element;
  name: string;
  CMIHooks: CMIHooksType;
  onClick?: (() => void) | undefined;
  label: string;
}) => (
  <Tooltip label={label}>
    <ActionIcon onClick={onClick} variant="outline" size={'lg'}>
      {icon}
    </ActionIcon>
  </Tooltip>
);
