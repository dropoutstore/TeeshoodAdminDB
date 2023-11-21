import {CMIObjectType} from '../../../CMI/hooks/designHooks.client';

type Props = {
  selectedObject: CMIObjectType | null;
  onChange: (obj: CMIObjectType) => void;
};

export function ObjectEditor({selectedObject, onChange}: Props) {
  return (
    <div className="p-4 text-left">
      {selectedObject && (
        <div>
          {/* <h6 className="py-2 font-semibold text-gray-500 text-lg">
            Transform
          </h6> */}
          {/* <div>
            <label htmlFor="#rotate">Rotate</label>
            <input
              id="rotate"
              type="range"
              min={-179}
              max={180} 
              step={1}
              value={selectedObject.rotation}
              onChange={(e) =>
                onChange({...selectedObject, rotation: parseInt(e.target.value)})
              }
            />
          </div> */}
        </div>
      )}
    </div>
  );
}

// export const
