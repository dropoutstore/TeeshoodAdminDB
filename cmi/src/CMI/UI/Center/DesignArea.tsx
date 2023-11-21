import { Group, Layer, Line, Rect, Stage, Transformer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import React, { useRef, useState } from 'react';
import { designHookType } from '../../hooks/designHooks.client';
import { SNAP_THRESHOLD, SNAP_LINE_STYLE } from '../../utils/snapGrids';
import { productHookType } from '../../hooks/productHooks.client';
import { ObjectRender } from './objectRender';
import { CMIReferenceTypes } from '.';

// import CMIImage from './objects/image.client';
type Props = {
  productHook: productHookType;
  designHooks: designHookType;
  scaleFactor: number;
  references: CMIReferenceTypes;
};

export function DesignArea({
  designHooks,
  productHook,
  scaleFactor,
  references,
}: Props) {
  const { setSelectObject } = designHooks;
  const { selectedSide } = productHook;
  const containerWidth = 500 * scaleFactor;
  const deselect = () => setSelectObject(null);
  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      deselect();
    }
  };
  const { h, lm, tm, w } = selectedSide;
  const height = h * scaleFactor;
  const width = w * scaleFactor;
  const left = lm * scaleFactor;
  const top = tm * scaleFactor;
  const [hLines, setHLines] = useState<any[]>([]);
  const [vLines, setVLines] = useState<any[]>([]);
  const stageRef = useRef<any>();

  const getSnapLines = (excludedShape: any) => {
    const stage = stageRef.current;
    if (stage) {
      const vertical: any = [];
      const horizontal: any = [];

      // We snap over edges and center of each object on the canvas
      // We can query and get all the shapes by their name property `shape`.
      stage.find('.shape').forEach((shape: any) => {
        // We don't want to snap to the selected shape, so we will be passing them as `excludedShape`
        if (shape === excludedShape) {
          return;
        }
        const box = shape.getClientRect({ relativeTo: stage });
        vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
        horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
      });

      return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat(),
      };
    }

    return null;
  };
  const getShapeSnappingEdges = () => {
    const stage = stageRef.current;
    const tr = references.trRef.current;
    // back is a shape created by the Transformer node, which covers the entire selected shape area.
    const box = tr.findOne('.back').getClientRect({ relativeTo: stage });
    const absPos = tr.findOne('.back').absolutePosition();

    return {
      vertical: [
        // Left vertical edge
        {
          guide: box.x,
          offset: absPos.x - box.x,
          snap: 'start',
        },
        // Center vertical edge
        {
          guide: box.x + box.width / 2,
          offset: absPos.x - box.x - box.width / 2,
          snap: 'center',
        },
        // Right vertical edge
        {
          guide: box.x + box.width,
          offset: absPos.x - box.x - box.width,
          snap: 'end',
        },
      ],
      horizontal: [
        // Top horizontal edge
        {
          guide: box.y,
          offset: absPos.y - box.y,
          snap: 'start',
        },
        // Center horizontal edge
        {
          guide: box.y + box.height / 2,
          offset: absPos.y - box.y - box.height / 2,
          snap: 'center',
        },
        // Bottom horizontal edge
        {
          guide: box.y + box.height,
          offset: absPos.y - box.y - box.height,
          snap: 'end',
        },
      ],
    };
  };
  const getSnapLine = ({ snapLine, offset, snap }: any, orientation: any) => {
    return { snapLine, offset, orientation, snap };
  };
  const getClosestSnapLines = (
    possibleSnapLines: any,
    shapeSnappingEdges: any
  ) => {
    const getAllSnapLines = (direction: any) => {
      const result: any = [];
      possibleSnapLines[direction].forEach((snapLine: any) => {
        shapeSnappingEdges[direction].forEach((snappingEdge: any) => {
          const diff = Math.abs(snapLine - snappingEdge.guide);
          // If the distance between the line and the shape is less than the threshold, we will consider it a snapping point.
          if (diff > SNAP_THRESHOLD) return;

          const { snap, offset } = snappingEdge;
          result.push({ snapLine, diff, snap, offset });
        });
      });
      return result;
    };

    const resultV = getAllSnapLines('vertical');
    const resultH = getAllSnapLines('horizontal');

    const closestSnapLines = [];

    // find closest vertical and horizontal snappping lines
    const [minV] = resultV.sort((a: any, b: any) => a.diff - b.diff);
    const [minH] = resultH.sort((a: any, b: any) => a.diff - b.diff);
    if (minV) closestSnapLines.push(getSnapLine(minV, 'V'));
    if (minH) closestSnapLines.push(getSnapLine(minH, 'H'));

    return closestSnapLines;
  };
  const drawLines = (lines: any[] = []) => {
    if (lines.length > 0) {
      const hLines: any = [];
      const vLines: any = [];
      lines.forEach((l) => {
        if (l.orientation === 'H') {
          const line = {
            points: [-6000, 0, 6000, 0],
            x: 0,
            y: l.snapLine,
            ...SNAP_LINE_STYLE,
          };
          hLines.push(line);
        } else if (l.orientation === 'V') {
          const line = {
            points: [0, -6000, 0, 6000],
            x: l.snapLine,
            y: 0,
            ...SNAP_LINE_STYLE,
          };
          vLines.push(line);
        }
      });

      // Set state
      setHLines(hLines);
      setVLines(vLines);
    }
  };
  const onDragMove = () => {
    const target = references.trRef.current;
    // Get the selected shape from `Transformer`
    const [selectedNode] = target.getNodes();

    if (!selectedNode) return;

    // Find possible snapping lines
    const possibleSnappingLines = getSnapLines(selectedNode);
    // Find snapping edges of selected shapes
    const snappingEdges = getShapeSnappingEdges();

    // Now find the closest snapping lines
    const snapLines = getClosestSnapLines(possibleSnappingLines, snappingEdges);

    // Do nothing if no snapping lines
    if (snapLines.length === 0) {
      setHLines([]);
      setVLines([]);

      return;
    }

    // draw the lines
    drawLines(snapLines);

    const orgAbsPos = target.absolutePosition();
    const absPos = target.absolutePosition();

    // Find new position
    snapLines.forEach((l) => {
      const position = l.snapLine + l.offset;
      if (l.orientation === 'V') {
        absPos.x = position;
      } else if (l.orientation === 'H') {
        absPos.y = position;
      }
    });

    // calculate the difference between original and new position
    const vecDiff = {
      x: orgAbsPos.x - absPos.x,
      y: orgAbsPos.y - absPos.y,
    };

    // apply the difference to each shape in the transformer.

    const nodeAbsPos = selectedNode.getAbsolutePosition();

    const newPos = {
      x: nodeAbsPos.x - vecDiff.x,
      y: nodeAbsPos.y - vecDiff.y,
    };

    selectedNode.setAbsolutePosition(newPos);
  };
  return (
    <div
      style={{ width: containerWidth }}
      className={`relative w-[${(500 * scaleFactor).toString()}px] mx-auto`}
    >
      <img
        style={{
          width: containerWidth,
          transform: `scale(${selectedSide.flip ? -1 : 1},1)`,
        }}
        src={selectedSide.image}
        alt="product"
        className={`top-0 z-0 transform -scale-x-100 absolute`}
      />
      <div className={` z-10 relative`}>
        <Stage
          width={500 * scaleFactor}
          height={500 * scaleFactor}
          onClick={(e) =>
            e.target === stageRef.current && references.trRef?.current?.nodes([])
          }
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          ref={stageRef}
        >
          <Layer>
            <Group
              strokeWidth={2}
              stroke={'#000'}
              clipFunc={(ctx: any) => {
                // if (type === "rect" && width && height) {
                ctx.beginPath();
                ctx.moveTo(left, top);
                ctx.lineTo(left + width, top);
                ctx.quadraticCurveTo(left + width, top, left + width, top);
                ctx.lineTo(left + width, top + height);
                ctx.quadraticCurveTo(
                  left + width,
                  top + height,
                  left + width,
                  top + height
                );
                ctx.lineTo(left, top + height);
                ctx.quadraticCurveTo(left, top + height, left, top + height);
                ctx.lineTo(left, top);
                ctx.quadraticCurveTo(left, top, left, top);
                ctx.closePath();
                // } else if (type === "circle") {
                //     ctx.beginPath()
                //     ctx.arc(x, y, radius, 0, Math.PI * 2)
                //     ctx.closePath()
                // }
              }}
            >
              <Rect
                x={left}
                y={top}
                id={'outerLayer'}
                strokeWidth={1}
                stroke={'#000'}
                width={width}
                height={height}
                dash={[10, 5]}
              />
              <Rect
                x={left - 1}
                y={top - 1}
                id={'outerLayer2'}
                strokeWidth={1}
                stroke={'#fff'}
                width={width + 2}
                height={height + 2}
                dash={[10, 5]}
              />
              <ObjectRender
                references={references}
                productHook={productHook}
                designHooks={designHooks}
                scaleFactor={scaleFactor}
                onDragMove={onDragMove}
                setHLines={setHLines}
                setVLines={setVLines}
              />
            </Group>

            {hLines.map((item: any, i) => (
              <Line key={i} {...item} strokeScaleEnabled={false} />
            ))}
            {vLines.map((item: any, i) => (
              <Line key={i} {...item} strokeScaleEnabled={false} />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
