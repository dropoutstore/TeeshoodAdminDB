import { CMIObjectType } from "../hooks/designHooks.client";

export interface rotationObjectType {
    x:number,
    y:number,
    width:number,
    height:number,
    rotation:number,
}

export function degToRad(angle:number) {
    return angle / 180 * Math.PI;
  }

export function getCenter(shape:rotationObjectType) {
    const angleRad = degToRad(shape.rotation || 0);
    return {
      x:
        shape.x +
        shape.width / 2 * Math.cos(angleRad) +
        shape.height / 2 * Math.sin(-angleRad),
      y:
        shape.y +
        shape.height / 2 * Math.cos(angleRad) +
        shape.width / 2 * Math.sin(angleRad)
    };
  }

  export function rotateAroundPoint(shape:rotationObjectType, deltaDeg:number, point:{x:number,y:number}) {
    const angleRad = degToRad(deltaDeg);
    const x = Math.round(
      point.x +
        (shape.x - point.x) * Math.cos(angleRad) -
        (shape.y - point.y) * Math.sin(angleRad)
    );
    const y = Math.round(
      point.y +
        (shape.x - point.x) * Math.sin(angleRad) +
        (shape.y - point.y) * Math.cos(angleRad)
    );
    return {
      rotation: Math.round((shape.rotation + deltaDeg)),
      x,
      y
    };
  }

  export function rotateAroundCenter(shape:rotationObjectType, deltaDeg:number) {
    const center = getCenter(shape);
    return rotateAroundPoint(shape, deltaDeg, center);
  }