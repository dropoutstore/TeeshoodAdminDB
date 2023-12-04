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
export const CMIproducts: CMIproductType[] = [
  {
    name: 'Unisex T-Shirt Men',
    printTypes: ['DTF', 'DTG', 'Screen'],
    basePrice:178,
    
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
        sides: [
          {
            sideName: 'Front',
            image: MenBlackFrontImg,
            tm: 70,
            lm: 150,
            w: 210,
            h: 380,
          },
          {
            sideName: 'Back',
            image: MenBlackBackImg,
            tm: 100,
            lm: 140,
            w: 200,
            h: 350,
          },
          {
            sideName: 'Left',
            image: MenBlackLeftImg,
            tm: 180,
            lm: 250,
            w: 150,
            h: 200,
          },
          {
            sideName: 'Right',
            image: MenBlackLeftImg,
            flip: true,
            tm: 180,
            lm: 250,
            w: 150,
            h: 200,
          },
        ],
        name: 'white',
      },
      {
        bgColour: '#000',
        colorCode: '#000',
        sides: [
          {
            sideName: 'Front',
            image: MenBlackFrontImg,
            tm: 70,
            lm: 150,
            w: 210,
            h: 380,
          },
          {
            sideName: 'Back',
            image: MenBlackBackImg,
            tm: 100,
            lm: 140,
            w: 200,
            h: 350,
          },
          {
            sideName: 'Left',
            image: MenBlackLeftImg,
            tm: 180,
            lm: 250,
            w: 150,
            h: 200,
          },
          {
            sideName: 'Right',
            image: MenBlackLeftImg,
            flip: true,
            tm: 180,
            lm: 250,
            w: 150,
            h: 200,
          },
        ],
        name: 'black',
      },
    ],
  },
  {
    name: 'Unisex T-Shirt Women',
    printTypes: ['DTF', 'DTG', 'Screen'],
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
    GSM: [250, 350, 400],
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
        sides: [
          {
            sideName: 'Front',
            image: MenWhiteFrontImg,
            tm: 80,
            lm: 140,
            w: 200,
            h: 350,
          },
          {
            sideName: 'Back',
            image: MenWhiteBackImg,
            tm: 100,
            lm: 140,
            w: 200,
            h: 350,
          },
          {
            sideName: 'Left',
            image: MenWhiteLeftImg,
            tm: 180,
            lm: 250,
            w: 150,
            h: 200,
          },
          {
            sideName: 'Right',
            flip: true,
            image: MenWhiteLeftImg,
            tm: 180,
            lm: 250,
            w: 150,
            h: 200,
          },
        ],
      },
    ],
  },
];
