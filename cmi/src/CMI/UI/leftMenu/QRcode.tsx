import React from 'react'
import { designHookType } from '../../hooks/designHooks.client';
import { Button, Textarea } from '@mantine/core';

type Props = {
    designHooks: designHookType;
}

export default function QRcode({}: Props) {
  return (
    <div>
        <Textarea minRows={10} />
        <Button>
            Add QR
        </Button>
    </div>
  ) 
}