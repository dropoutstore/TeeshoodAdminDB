import MenBlackBackImg from './men-black-back.png';
import MenBlackFrontImg from './men-black-front.png';
import MenBlackLeftImg from './men-black-left.png';
import MenWhiteBackImg from './men-white-back.png';
import MenWhiteFrontImg from './men-white-front.png';
import MenWhiteLeftImg from './men-white-left.png';

export interface CMIproductType {
  name: string;
  description: React.ReactNode;
  basePrice: number;
  productCode: string;
  sizes: { size: string; price: number }[];
  GSM: number[];
  printInfo: string[];
  colours: CMIProductColour[];
  featuredImage: string;
  printTypes: CMIPrintTypes[];
  // images: CMIProductSides[];
}

export type CMIPrintTypes = 'DTG' | 'DTF' | 'Screen';
export interface CMIProductColour {
  sides: CMIProductSide[];
  name: string;
  colorCode: string;
  bgColour: string;
  printingCost: {
    DTG: number;
    DTF: number;
    screen: number;
    embroidery: number;
  };
}
export interface CMIProductSide {
  printHeight: number;
  printWidth: number;
  sideName: string;
  image: string;
  flip?: boolean;
  tm: number;
  lm: number;
  w: number;
  h: number;
}
const positions = {
  front: { w: 14 * 15, h: 25 * 15, tm: 70, lm: 150 },
  back: { w: 14 * 15, h: 25 * 15, tm: 70, lm: 150 },
  left: { tm: 210, lm: 190, w: 11 * 15, h: 11 * 15 },
  right: { tm: 210, lm: 145, w: 11 * 15, h: 11 * 15 },
};
export const CMIproducts: CMIproductType[] = [
  {
    name: 'Unisex T-Shirt Men',
    printTypes: ['DTF', 'DTG', 'Screen'],
    basePrice: 178,
    productCode: 'ABCDEF',
    GSM: [250, 350, 400, 500],
    sizes: [
      { size: 'XS', price: 300 },
      { size: 'S', price: 350 },
      { size: 'M', price: 350 },
      { size: 'L', price: 350 },
      { size: 'XL', price: 400 },
      { size: 'XXL', price: 400 },
      { size: '3XL', price: 500 },
      { size: '4XL', price: 500 },
    ],
    description:
      'IntelliFresh The garment is treated with FRESHON™ silver technology that effectively neutralizes odour-causing bacteria up to 99% for longer lasting freshness.',
    featuredImage: MenBlackFrontImg,
    printInfo: [
      'DTG (Direct-to-garment) prints',
      'Colors may differ slightly from the screen due to illumination and screen settings',
    ],
    colours: [
      {
        bgColour: '#fff',
        colorCode: '#fff',
        printingCost: {
          DTF: 1,
          DTG: 1.5,
          screen: 30,
          embroidery: 25,
        },
        sides: [
          {
            sideName: 'Front',
            image: MenWhiteFrontImg,
            printHeight: 20,
            printWidth: 16,
            ...positions.front,
          },
          {
            sideName: 'Back',
            image: MenWhiteBackImg,
            printHeight: 20,
            printWidth: 16,
            ...positions.back,
          },
          {
            sideName: 'Left',
            image: MenWhiteLeftImg,
            printHeight: 20,
            printWidth: 16,
            ...positions.left,
          },
          {
            sideName: 'Right',
            image: MenWhiteLeftImg,
            flip: true,
            printHeight: 20,
            printWidth: 16,
            ...positions.right,
          },
        ],
        name: 'white',
      },
      {
        bgColour: '#000',
        colorCode: '#000',
        printingCost: {
          DTF: 1,
          DTG: 1.5,
          screen: 30,
          embroidery: 25,
        },
        sides: [
          {
            sideName: 'Front',
            image: MenBlackFrontImg,
            printHeight: 20,
            printWidth: 16,
            ...positions.front,
          },
          {
            sideName: 'Back',
            image: MenBlackBackImg,
            printHeight: 20,
            printWidth: 16,
            ...positions.back,
          },
          {
            sideName: 'Left',
            image: MenBlackLeftImg,

            printHeight: 20,
            printWidth: 16,
            ...positions.left,
          },
          {
            sideName: 'Right',
            image: MenBlackLeftImg,
            flip: true,

            printHeight: 20,
            printWidth: 16,
            ...positions.right,
          },
        ],
        name: 'black',
      },
    ],
  },
  {
    name: 'Unisex T-Shirt Women',
    printTypes: ['DTF', 'DTG', 'Screen'],
    basePrice: 178,
    productCode: 'ABCDEF',
    sizes: [
      { size: 'XS', price: 300 },
      { size: 'S', price: 350 },
      { size: 'M', price: 350 },
      { size: 'L', price: 350 },
      { size: 'XL', price: 400 },
      { size: 'XXL', price: 400 },
      { size: '3XL', price: 500 },
      { size: '4XL', price: 500 },
      { size: '5XL', price: 600 },
    ],
    GSM: [250, 350],
    description:
      'IntelliFresh The garment is treated with FRESHON™ silver technology that effectively neutralizes odour-causing bacteria up to 99% for longer lasting freshness.',
    featuredImage: MenWhiteFrontImg,
    printInfo: [
      'DTG (Direct-to-garment) prints',
      'Colors may differ slightly from the screen due to illumination and screen settings',
    ],
    colours: [
      {
        bgColour: '#fff',
        colorCode: '#fff',
        name: 'red',
        printingCost: {
          DTF: 1,
          DTG: 1.5,
          screen: 30,
          embroidery: 25,
        },
        sides: [
          {
            sideName: 'Front',
            image: MenWhiteFrontImg,

            printHeight: 20,
            printWidth: 16,
            ...positions.front,
          },
          {
            sideName: 'Back',
            image: MenWhiteBackImg,

            printHeight: 20,
            printWidth: 16,
            ...positions.back,
          },
          {
            sideName: 'Left',
            image: MenWhiteLeftImg,

            printHeight: 3,
            printWidth: 3,
            ...positions.left,
          },
          {
            sideName: 'Right',
            flip: true,
            image: MenWhiteLeftImg,

            printHeight: 3,
            printWidth: 3,
            ...positions.right,
          },
        ],
      },
    ],
  },
];
