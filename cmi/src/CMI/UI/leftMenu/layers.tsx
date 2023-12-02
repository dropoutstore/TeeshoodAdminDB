import React from 'react';
// import {CMISideDesignType} from '../../hooks/designHooks.client';
// import { CMIProductSide } from '../../products.client';
import { IconGridDots, IconLetterT } from '@tabler/icons-react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { CMIObjectType, designHookType } from '../../hooks/designHooks.client';
import { productHookType } from '../../hooks/productHooks.client';
import { CMIHooksType } from '../../hooks';
import { Title } from '@mantine/core';

type Props = {
  CMIHooks: CMIHooksType;
};

export function LayerEditor({ CMIHooks }: Props) {
  const { designHooks, productHooks } = CMIHooks;
  const { designs, setDesigns, setLoading, setSelectObject } = designHooks;
  const { selectedSide } = productHooks;
  const selectedDesigns = designs[selectedSide.sideName];
  const setSelectedDesigns = (newDes: CMIObjectType[]) => {
    const target = { ...designs };
    target[selectedSide.sideName] = newDes;
    setDesigns(target);
    setLoading(true);
  };

  return (
    <div className="text-left w-full h-full ">
      {selectedDesigns.length > 0 && (
        <Title order={5} align="center">
          {selectedSide.sideName ?? ''}
        </Title>
      )}
      <DragDropContext
        onDragEnd={(result: DropResult) => {
          // dropped outside the list
          if (!result.destination) {
            return;
          }
          const target = Array.from(selectedDesigns);
          const [removed] = target.splice(result.source.index, 1);
          target.splice(result.destination.index, 0, removed);
          setSelectedDesigns(target);
        }}
      >
        <Droppable droppableId="layers">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="rounded-lg p-2 overflow-auto"
              style={{
                background: snapshot.isDraggingOver ? '#d1f7c3' : 'white',
                height: '100%',
                maxHeight: 600,
              }}
            >
              {selectedDesigns.length > 0 ? (
                selectedDesigns.map((design, index) => (
                  <div onClick={() => setSelectObject(design)}>
                    <Draggable
                      key={design.id}
                      draggableId={design.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="gap-2 flex bg-white rounded-md my-2 items-center"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <IconGridDots className="cursor-grab" />
                          {(() => {
                            switch (design.type) {
                              case 'image':
                                return (
                                  <>
                                    <p>image</p>
                                    <img
                                      src={design.src}
                                      className="max-w-[48px] max-h-12"
                                      alt="uploaded"
                                    />
                                  </>
                                );
                              case 'text':
                                return (
                                  <>
                                    <IconLetterT size={24} />
                                    <p className="text-ellipsis overflow-hidden w-48">
                                      {design.text}
                                    </p>
                                  </>
                                );
                              default:
                                return <></>;
                            }
                          })()}
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))
              ) : (
                <>No Designs</>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
