type PODFileItem<T> = {
  [P in keyof T]: { field: P; columnName: string; value: T[P] };
}[keyof T];

export interface PODFileType {
  Name: string;
  Email: string | null;
  FulfillmentStatus: string | null;
  FulfilledAt: string | null;
  Shipping: number | null;
  ShippingMethod: string | null;
  CreatedAt: string;
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
  CancelledAt: string | null;
  Vendor: string | null;
  Location: string | null;
  Id: number | null;
  Tags: string | null;
  Source: string | null;
  Phone: string | null;
  ReceiptNumber: string | null;
  BillingProvinceName: string | null;
  ShippingProvinceName: string | null;
}
export const PODFileColumns: PODFileItem<PODFileType>[] = [
  { field: 'Name', columnName: 'Name', value: '' },
  { field: 'Email', columnName: 'Email', value: null },
  { field: 'FulfillmentStatus', columnName: 'Fulfillment Status', value: null },
  { field: 'FulfilledAt', columnName: 'Fulfilled At', value: null },
  { field: 'Shipping', columnName: 'Shipping', value: 0 },
  { field: 'ShippingMethod', columnName: 'Shipping Method', value: null },
  { field: 'CreatedAt', columnName: 'Created At', value: '' },
  { field: 'LineitemQuantity', columnName: 'Lineitem Quantity', value: 0 },
  { field: 'LineitemName', columnName: 'Lineitem Name', value: '' },
  { field: 'LineitemSku', columnName: 'Lineitem SKU', value: null },
  { field: 'BillingName', columnName: 'Billing Name', value: null },
  { field: 'BillingStreet', columnName: 'Billing Street', value: null },
  { field: 'BillingAddress1', columnName: 'Billing Address 1', value: null },
  { field: 'BillingAddress2', columnName: 'Billing Address 2', value: null },
  { field: 'BillingCompany', columnName: 'Billing Company', value: null },
  { field: 'BillingCity', columnName: 'Billing City', value: null },
  { field: 'BillingZip', columnName: 'Billing Zip', value: null },
  { field: 'BillingProvince', columnName: 'Billing Province', value: null },
  { field: 'BillingCountry', columnName: 'Billing Country', value: null },
  { field: 'BillingPhone', columnName: 'Billing Phone', value: null },
  { field: 'ShippingName', columnName: 'Shipping Name', value: null },
  { field: 'ShippingStreet', columnName: 'Shipping Street', value: null },
  { field: 'ShippingAddress1', columnName: 'Shipping Address 1', value: null },
  { field: 'ShippingAddress2', columnName: 'Shipping Address 2', value: null },
  { field: 'ShippingCompany', columnName: 'Shipping Company', value: null },
  { field: 'ShippingCity', columnName: 'Shipping City', value: null },
  { field: 'ShippingZip', columnName: 'Shipping Zip', value: null },
  { field: 'ShippingProvince', columnName: 'Shipping Province', value: null },
  { field: 'ShippingCountry', columnName: 'Shipping Country', value: null },
  { field: 'ShippingPhone', columnName: 'Shipping Phone', value: null },
  { field: 'Notes', columnName: 'Notes', value: null },
  { field: 'NoteAttributes', columnName: 'Note Attributes', value: null },
  { field: 'CancelledAt', columnName: 'Cancelled At', value: null },
  { field: 'Vendor', columnName: 'Vendor', value: null },
  { field: 'Location', columnName: 'Location', value: null },
  { field: 'Id', columnName: 'ID', value: 0 },
  { field: 'Tags', columnName: 'Tags', value: null },
  { field: 'Source', columnName: 'Source', value: null },
  { field: 'Phone', columnName: 'Phone', value: null },
  { field: 'ReceiptNumber', columnName: 'Receipt Number', value: null },
  {
    field: 'BillingProvinceName',
    columnName: 'Billing Province Name',
    value: null,
  },
  {
    field: 'ShippingProvinceName',
    columnName: 'Shipping Province Name',
    value: null,
  },
];
