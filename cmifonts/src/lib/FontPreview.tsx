/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState, useEffect } from 'react';
import { Layer, Stage, Text } from 'react-konva';
import { loadCustomFont } from './loadCustomFont';
import { Loader } from '@mantine/core';
export function FontPreview({
  fontName,
  fontURL,
  addImagePreview,
  preview,
}: {
  fontName: string;
  fontURL: string;
  addImagePreview: (imgFile: string, fontName: string) => void;
  preview: string | null | undefined;
}) {
  const textRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      loadCustomFont({ fontName, fontURL }).then(() => {
        setIsFontLoaded(true);
      });
    }, 500);
  }, [fontName, fontURL]);
  useEffect(() => {
    if (stageRef.current && isFontLoaded) {
      addImagePreview(
        stageRef.current.toDataURL({
          mimeType: 'image/png',
          width: textRef.current.textWidth + 5,
          height: textRef.current.textHeight + 5,
        }),
        fontName
      );
    }
  }, [stageRef, isFontLoaded]);
  if (preview)
    return (
      <div>
        <Stage className="hidden" ref={stageRef} width={2000} height={500}>
          <Layer>
            <Text
              ref={textRef}
              x={2}
              y={2}
              text={fontName}
              fontSize={25}
              fontFamily={fontName}
            />
          </Layer>
        </Stage>
        <img src={preview} alt={fontName} />
      </div>
    );
  else if (isFontLoaded)
    return (
      <div className="relative z-0 p-4 bg-white">
        <div className="absolute -z-10 overflow-auto">
          <div className="w-[2000px]">
            <Stage ref={stageRef} width={2000} height={500}>
              <Layer>
                <Text
                  ref={textRef}
                  x={2}
                  y={2}
                  text={fontName}
                  fontSize={25}
                  fontFamily={fontName}
                />
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    );
  else return <Loader size={'xs'} />;
}
