import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Text, TextInput, Title } from '@mantine/core';
import { IconEdit, IconSearch } from '@tabler/icons-react';
import { fontInterfaceType } from './TextEditor';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@admin/configs';
import { loadCustomFont } from '@admin/cmifonts';
type Props = {
  selectedFont: fontInterfaceType | null | string;
  setSelectedFont: (font: fontInterfaceType | null) => void;
  // setFontModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FontsSelector({
  selectedFont,
  setSelectedFont,
}: // setFontModal,
Props) {
  const [fonts, setFonts] = useState<fontInterfaceType[]>([]);
  const [fontModal, setFontModal] = useState(false);
  useEffect(() => {
    getDocs(query(collection(db, 'fonts'), limit(50))).then((fontRef) => {
      setFonts(fontRef.docs.map((d) => d.data()) as fontInterfaceType[]);
    });
  }, []);
  return (
    <div className="flex gap-x-8 items-center">
      <Text color="primary" size={'sm'} weight={600}>
        {' '}
        Font
      </Text>
      <Button
        variant="outline"
        // className='text-black'
        onClick={() => setFontModal(true)}
        rightIcon={<IconEdit size={16} onClick={() => setSelectedFont(null)} />}
      >
        {typeof selectedFont === 'string'
          ? selectedFont
          : selectedFont?.name ?? 'select Font'}
      </Button>
      <Modal fullScreen opened={fontModal} onClose={() => setFontModal(false)}>
        <div>
          <Title order={4}>Select Font</Title>
          <TextInput rightSection={<IconSearch />} />
          <div className="flex flex-wrap max-w-6xl mx-auto">
            {fonts.map((font) => (
              <Card
                onClick={async () => {
                  await loadCustomFont({
                    fontURL: font.fontFile,
                    fontName: font.name,
                  });
                  setSelectedFont(font);
                  setFontModal(false);
                }}
              >
                <img src={font.preview} alt={font.name} className="" />
              </Card>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
