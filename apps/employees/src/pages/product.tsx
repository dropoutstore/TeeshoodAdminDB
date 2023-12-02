/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-empty-pattern */
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../app/store';
import { Products } from '@admin/products';

type Props = {};

export default function ProductComponent({}: Props) {
  const { claims } = useSelector((state: RootState) => state.user);

  if (!claims['products']) return <div>Denied : Contact admin for access</div>;
  return <Products />;
}
