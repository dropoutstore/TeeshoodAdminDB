import React from 'react';
// import {CMISideDesignType} from '../../hooks/designHooks.client';
// import { CMIProductSide } from '../../products.client';
import {CMIObjectType} from '../../../CMI/hooks/designHooks.client';
import {IconGridDots, IconLetterT} from '@tabler/icons-react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

type Props = {
  selectedDesigns: CMIObjectType[];
  setSelectedDesigns: (t: CMIObjectType[]) => void;
  selectObject: (t: CMIObjectType) => void;
};

export function LayerEditor({
  selectedDesigns,
  setSelectedDesigns,
  selectObject,
}: Props) {
  return (
    <div className="text-left w-full h-full">
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
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className="rounded-lg p-4"
              style={{
                background: snapshot.isDraggingOver ? '#d1f7c3' : 'white',
                height: '100%',
              }}
            >
              {selectedDesigns ? (
                selectedDesigns.map((design, index) => (
                  <div onClick={() => selectObject(design)}>
                    <Draggable
                      key={design.id}
                      draggableId={design.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="gap-2 flex p-4 bg-white rounded-md my-2"
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
                                    />
                                    <p>image</p>
                                  </>
                                );
                              case 'text':
                                return (
                                  <>
                                    <IconLetterT size={24} />
                                    <p>{design.text}</p>
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
