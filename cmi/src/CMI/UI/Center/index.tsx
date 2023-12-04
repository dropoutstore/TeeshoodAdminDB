import React, { useEffect, useState } from 'react';
import { DesignArea } from './DesignArea';
import { productHookType } from '../../hooks/productHooks.client';
import { designHookType } from '../../hooks/designHooks.client';
import { SidePick } from './sidePick.client';
import { ObjectRender } from './objectRender';
import { CMIHooksType } from '../../hooks';
import { useMediaQuery } from '@mantine/hooks';

export interface CMIReferenceTypes {
  shapeRef: React.MutableRefObject<any>;
  trRef: React.MutableRefObject<any>;
}

type Props = {
  CMIHooks: CMIHooksType;
};

export default function Center({ CMIHooks }: Props) {
  const { designHooks,productHooks } = CMIHooks;
  const shapeRef = React.useRef<any>(
    designHooks?.designs[productHooks.selectedSide.sideName]?.map(() =>
      React.createRef()
    )
  );
  const trRef = React.useRef<any>();
  const references = {
    shapeRef,
    trRef,
  };
  const [scaleFactor, setScaleFactor] = useState(1);
  const matches = useMediaQuery('(min-width: 768px)');
  useEffect(() => {
    if(matches) setScaleFactor(1)
    else setScaleFactor(0.6)
    return () => {
      setScaleFactor(1)
    }
  }, [matches])
  return (
    <div >
      <DesignArea
        scaleFactor={scaleFactor}
        CMIHooks={CMIHooks}
        references={references}
      />
      <SidePick CMIHooks={CMIHooks} />
    </div>
  );
}
