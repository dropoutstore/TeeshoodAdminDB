import { v4 } from 'uuid';
import { CMIObjectType } from './designHooks.client';

export const testObjects: CMIObjectType[] = [
  {
    id: v4().toString(),
    height: 150,
    type: 'image',
    src: 'https://picsum.photos/id/237/200/300',
    originalSrc: 'https://picsum.photos/id/237/200/300',
    rotation: 0,
    width: 150,
    x: 25,
    y: 25,    
  },
  {
    id: v4().toString(),
    height: 150,
    type: 'text',
    rotation: 0,
    width: 150,
    x: 55,
    y: 155,
    fill:"red",
    fontFamily:"roboto",
    fontSize:18,
    stroke:"white",
    strokeWidth:0,
    text:"test text",
    align:"center"
  },
];
