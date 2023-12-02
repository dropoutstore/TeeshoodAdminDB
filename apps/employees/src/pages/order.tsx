/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-empty-pattern */
import React from 'react';
import { useSelector } from 'react-redux';

import { Orders } from '@admin/orders';
import { RootState } from '../app/store';

type Props = {};

export default function OrderComponent({}: Props) {
  const { claims } = useSelector((state: RootState) => state.user);

  if (!claims['orders']) return <div>Denied : Contact admin for access</div>;
  return <Orders />;
}
