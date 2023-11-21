import React, { useState } from 'react';
import { DesignArea } from './DesignArea';
import { productHookType } from '../../hooks/productHooks.client';
import { designHookType } from '../../hooks/designHooks.client';
import { SidePick } from './sidePick.client';
import { ObjectRender } from './objectRender';

export interface CMIReferenceTypes {
  shapeRef: React.MutableRefObject<any>;
  trRef: React.MutableRefObject<any>;
}

type Props = {
  productHook: productHookType;
  designHooks: designHookType;
};

export default function Center({ designHooks, productHook }: Props) {
  const shapeRef = React.useRef<any>(
    designHooks?.designs[productHook.selectedSide.sideName]?.map(() =>
      React.createRef()
    )
  );
  const trRef = React.useRef<any>();
  const references = {
    shapeRef,
    trRef,
  };
  const [scaleFactor, setScaleFactor] = useState(1);
  return (
    <div className="w-full">
      <DesignArea
        scaleFactor={scaleFactor}
        productHook={productHook}
        designHooks={designHooks}
        references={references}
      />
      <SidePick productHook={productHook} />
    </div>
  );
}
