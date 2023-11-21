import React, { useEffect, useState } from 'react';
import { testObjects } from './testObjects';

export interface designHookType {
  designs: CMISideDesignType;
  selectedObject: CMIObjectType | null;
  setSelectObject: React.Dispatch<React.SetStateAction<CMIObjectType | null>>;
  setDesigns: React.Dispatch<CMISideDesignType>;
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
}

export function useDesignHooks() {
  const [designs, setDesigns] = useState<CMISideDesignType>({
    Front: testObjects,
  });
  // const [selectedConfig, setSelectedConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedObject, setSelectObject] = useState<CMIObjectType | null>(
    null
  );
  useEffect(() => {
    if (loading) setSelectObject(null);
    setTimeout(() => {
      setLoading(false);
    }, 50);
  }, [loading]);

  return {
    designs,
    selectedObject,
    setSelectObject,
    setDesigns,
    loading,
    setLoading,
  };
}

// export interface CMIdeisgnType {
//   design: CMISideDesignType[];
// }

export interface CMISideDesignType {
  [key: string]: CMIObjectType[];
}

export type shapeProps = {
  x: number;
  y: number;
  flipX?: boolean;
  flipY?: boolean;
  rotation: number;
  id: string;
};
export type CMIObjectType = shapeProps &
  (
    | {
        type: 'image';
        src: string;
        text?: never; // ensures text is not present
        fontSize?: never;
        font?: never;
        width: number;
        height: number;
      }
    | {
        type: 'text';
        text: string;
        fontSize: number;
        width?: number;
        height?: number;
        src?: never; // ensures src is not present
        fill: string;
        fontFamily: string;
      }
  );


 