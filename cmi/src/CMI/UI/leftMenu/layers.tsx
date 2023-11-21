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

type Props = {
  designHooks: designHookType;
  productHook: productHookType;
};

export function LayerEditor({ designHooks, productHook }: Props) {
  const { designs, setDesigns, setLoading, setSelectObject } = designHooks;
  const { selectedSide } = productHook;
  const selectedDesigns = designs[selectedSide.sideName];
  const setSelectedDesigns = (newDes: CMIObjectType[]) => {
    const target = { ...designs };
    target[selectedSide.sideName] = newDes;
    setDesigns(target);
    setLoading(true);
  };

  return (
    <div className="text-left w-full h-full ">
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
              className="rounded-lg p-4 overflow-auto"
              style={{
                background: snapshot.isDraggingOver ? '#d1f7c3' : 'white',
                height: '100%',
                maxHeight: 600,
              }}
            >
              {selectedDesigns ? (
                selectedDesigns.map((design, index) => (
                  <div onClick={() => setSelectObject(design)}>
                    <Draggable
                      key={design.id}
                      draggableId={design.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="gap-2 flex p-4 bg-white rounded-md my-2 items-center"
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
                                    <img
                                      src={design.src}
                                      className="max-w-[24px] max-h-[24px]"
                                      alt="uploaded"
                                    />
                                    <p>image</p>
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
