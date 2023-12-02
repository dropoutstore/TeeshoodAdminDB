import React, { useEffect, useState } from 'react';
import { testObjects } from './testObjects';
import { fontInterfaceType } from '../UI/leftMenu/TextEditor';

export interface designHookType {
  designs: CMISideDesignType;
  selectedObject: CMIObjectType | null;
  setSelectObject: React.Dispatch<React.SetStateAction<CMIObjectType | null>>;
  setDesigns: React.Dispatch<CMISideDesignType>;
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
  selectedRef: any;
  setselectedRef: React.Dispatch<any>;
}

export function useDesignHooks(): designHookType {
  const [designs, setDesigns] = useState<CMISideDesignType>({
    // Front: testObjects,
  });
  // const [selectedConfig, setSelectedConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedRef, setselectedRef] = useState<any>();
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
    selectedRef,
    setselectedRef,
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
        originalSrc: string;
        text?: never; // ensures text is not present
        fontSize?: never;
        font?: never;
        width: number;
        height: number;
        fill?: never;
        fontFamily?: never;
        strokeWidth?: never;
        stroke?: never;
        align?: never;
      }
    | {
        type: 'text';
        text: string;
        fontSize: number;
        width?: number;
        height?: number;
        src?: never; // ensures src is not present
        originalSrc?: never;
        fill: string;
        fontFamily: string;
        strokeWidth: number;
        stroke: string;
        align: 'left' | 'center' | 'right' | 'justify';
      }
  );

export interface CMITextInputForm {
  text: string;
  fill: string;
  fontFamily: fontInterfaceType | null;
  strokeWidth: number;
  stroke: string;
  fontSize: number;
}
