import React from 'react';
import GrayButton from '../../CMIComponents/GrayButton';
import {CMIObjectType} from '../../../CMI/hooks/designHooks.client';
import {v4 as uid} from 'uuid';
type Props = {
  addText: (obj: CMIObjectType) => void;
};

export function TextEditor({addText}: Props) {
  return (
    <div>
      <GrayButton
        onClick={() => {
          addText({
            text: 'tedfbdfbxt',
            type: 'text',
            id: uid().toString(),
            rotation: 0,
            x: 100,
            y: 100,
            fontSize: 25,
            fill: 'blue',
            fontFamily: '"Epilouge",sans-serif',
            // width:100
          });
        }}
      >
        Add Text
      </GrayButton>
    </div>
  );
}
