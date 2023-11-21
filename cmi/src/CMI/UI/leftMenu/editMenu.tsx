import React from 'react';
import { designHookType } from '../../hooks/designHooks.client';
import { productHookType } from '../../hooks/productHooks.client';

type Props = {
  //     leftTabHook: CMILeftTabType;
  productHook: productHookType;
  designHooks: designHookType;
};

export default function EditMenu({ designHooks, productHook }: Props) {
  if (designHooks.selectedObject?.type === 'image') {
    return <div>{}</div>;
  } else if (designHooks.selectedObject?.type === 'text') {
    return <div>{}</div>;
  } else return <></>;
}

const EditBase = ({
  productHook,
}: {
  productHook: productHookType;
  designHooks: designHookType;
}) => {};
