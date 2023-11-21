import { CMIproductType } from '@admin/meta';
import * as yup from 'yup';

// const GSM = [250,350,400]

export interface SizePricing {
  size: string; // e.g., "S", "M", "L", "XL", etc.
  units: number; // Price per unit for this size
  pricePerUnit: number;
}
export interface Design {
  sideName: string;
  design: string;
}
export interface BulkOrderProduct {
  product: CMIproductType | null;
  designs: Design[];
  gsm: number; // Grams per square meter
  printType: 'DTG' | 'DTF' | 'Screen'; // Direct to Garment, Direct to Film, Screen Printing
  color: string; // e.g., "Red", "Blue", "Black", etc.
  sizePricing: SizePricing[];
  specialInstructions?: string; // Any additional instructions for the order
  paymentId?: string;
  amount?: number;
  // prductImage:string
}
const DesignSchema = yup.object().shape({
  sideName: yup.string().required('Side name is required.'),
  design: yup.string(),
});

// Validation schema for SizePricing interface
const SizePricingSchema = yup.object().shape({
  size: yup.string().required('Size is required.'),
  units: yup.number().min(0, 'Units must be at least 1').required('Units are required.'),
  pricePerUnit: yup.number().min(0, 'Price per unit cannot be negative').required('Price per unit is required.'),
});
export const bulkOrderProductSchema = yup.object().shape({
  product: yup.mixed().nullable().required('Product is required'), // You may want to validate the shape of CMIproductType if possible
  designs: yup.array()
  .of(DesignSchema)
  .min(1, 'At least one design is required.')
  .test({
    name: 'non-empty-design',
    message: 'At least one design must be non-empty.',
    test: (designs:any) => designs.some((design:any) => design.design && design.design.trim().length > 0),
  }),
  gsm: yup.number().positive('GSM must be a positive number').required('GSM is required'),
  printType: yup.string().oneOf(['DTG', 'DTF', 'Screen'], 'Invalid print type').required('Print type is required'),
  color: yup.string().required('Color is required'),
  sizePricing: yup.array()
    .of(SizePricingSchema)
    .min(1, 'At least one size pricing is required.')
    .test({
      name: 'nonZeroUnits',
      message: 'At least one size pricing must have units greater than 0', 
      test: (array:any) => array.some((obj:any) => obj.units > 0),
    }),
  specialInstructions: yup.string().optional(), // Not required
  paymentId: yup.string().optional(), // Not required
  amount: yup.number().positive('Amount must be a positive number').optional(), // Not required
  // productImage: yup.string().required('Product image is required'), // Uncomment and adjust accordingly if you want to include this field
});

