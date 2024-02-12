import { CMIProductDesignType } from '@admin/cmi';

export interface PODFileType {
  orderId: string;
  Name: string;
  Email: string | null;
  // FulfillmentStatus: string | null;
  // FulfilledAt: string | null;
  // Shipping: number | null;
  // ShippingMethod: string | null;
  // CreatedAt: string;
  LineitemQuantity: number;
  LineitemName: string;
  LineitemSku: string | null;
  BillingName: string | null;
  BillingStreet: string | null;
  BillingAddress1: string | null;
  BillingAddress2: string | null;
  BillingCompany: string | null;
  BillingCity: string | null;
  BillingZip: string | null;
  BillingProvince: string | null;
  BillingCountry: string | null;
  BillingPhone: string | null;
  ShippingName: string | null;
  ShippingStreet: string | null;
  ShippingAddress1: string | null;
  ShippingAddress2: string | null;
  ShippingCompany: string | null;
  ShippingCity: string | null;
  ShippingZip: string | null;
  ShippingProvince: string | null;
  ShippingCountry: string | null;
  ShippingPhone: string | null;
  Notes: string | null;
  NoteAttributes: string | null;
  // CancelledAt: string | null;
  // Vendor: string | null;
  Location: string | null;
  Id: number | null;
  Tags: string | null;
  // Source: string | null;
  Phone: string | null;
  ReceiptNumber: string | null;
  BillingProvinceName: string | null;
  ShippingProvinceName: string | null;
}

export interface PODType extends PODFileType {
  design?: CMIProductDesignType;
}

export interface PODOrderType {
  orders: PODType[];
  companyProfile?: CompanyProfile;
  payment?: {
    partial: {
      amount: number;
      status: bulkOrderPaymentStatuses;
      orderId?: string;
    };
    pendingPayment: {
      amount: number;
      status: bulkOrderPaymentStatuses;
      orderId?: string;
    };
    full: {
      amount: number;
      status: bulkOrderPaymentStatuses;
      orderId?: string;
    };
  };
}

export type bulkOrderPaymentStatuses = 'pending' | 'success';

export interface CompanyProfile {
  userName: string;
  email: string;
  organisationName: string;
  address: addressType[];
  phoneNumber: string;
}
export interface addressType {
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  // email: string;
  city: string;
  state: string;
  phoneNumber: string;
  pincode: string;
}
