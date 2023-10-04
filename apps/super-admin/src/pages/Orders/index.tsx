// import React, { useEffect, useState } from 'react';
// import { TableComponent } from '@admin/table-component';
// import { Button, Chip, Title, Select } from '@mantine/core';
// import {
//   collection,
//   doc,
//   getDocs,
//   limit,
//   onSnapshot,
//   orderBy,
//   query,
//   setDoc,
//   updateDoc,
// } from 'firebase/firestore';
// import { db } from '@admin/configs';
// import OrdersExpanded from './ordersExpanded';

// export default function Orders() {
//   const [orders, setOrders] = useState<any[]>([]);
//   useEffect(() => {
//     const q = query(
//       collection(db, 'Orders'),
//       orderBy('created_at', 'desc'),
//       limit(10)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setOrders(snapshot.docs.map((t) => t.data()));
//     });

//     // Cleanup function
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div>
//       <Title className="">Orders</Title>
//       <br />
//       <TableComponent
//         tableProps={{
//           data: orders,
//           columns: [
//             {
//               name: 'Order ID',
//               selector: (row: any) => row.id,
//             },
//             {
//               name: 'Cusomer',
//               selector: (row: any) => row.billing_address.first_name,
//             },
//             {
//               name: 'Phone',
//               selector: (row: any) => row.phone,
//             },
//             {
//               name: 'Email',
//               selector: (row: any) => row.email,
//             },
//             {
//               name: 'Status',
//               selector: (row: any) => (
//                 <Select
//                   data={[
//                     { value: 'CREATED', label: 'Created' },
//                     { value: 'PRINT', label: 'Ready For Print' },
//                     { value: 'PRINTCOMPLETE', label: 'Printing Completed' },
//                     { value: 'SHIPPED', label: 'Shipped' },
//                   ]}
//                   value={row.th_status}
//                   onChange={async (e) => {

//                     await updateDoc(doc(collection(db, 'Orders'), row.id.toString()), {  
//                       th_status: e,
//                     });
//                   }}
//                 />
//               ),
//             },
//             {
//               name: 'Payment',
//               selector: (row: any) =>
//                 row.payment_gateway_names.map((pay: string) => (
//                   <Chip key={pay} size={'xs'} color="indigo" variant="light">
//                     {pay}
//                   </Chip>
//                 )),
//             },
//             {
//               name: 'Item',
//               selector: (row: any) => row.line_items[0].name,
//             },
//           ],
//           expandableRowsComponent: (order) => (
//             <OrdersExpanded order={order.data} />
//           ),
//         }}
//         environment={{
//           production: false,
//         }}
//         loading={false}
//         setData={() => void 0}
//         setLoading={() => void 0}
//         setLinkPaymentModal={() => void 0}
//       />
//     </div>
//   );
// }

// const tesdtorder = {
//   id: 5499751891243,
//   admin_graphql_api_id: 'gid://shopify/Order/5499751891243',
//   app_id: 580111,
//   browser_ip: '103.192.116.26',
//   buyer_accepts_marketing: false,
//   cancel_reason: null,
//   cancelled_at: null,
//   cart_token: 'c1-28855bd94473ed78dc35ba03bbc4ce87',
//   checkout_id: 36921331286315,
//   checkout_token: 'da797ec2da3be6d5ed5870d7f2922b04',
//   client_details: {
//     accept_language: 'en-IN',
//     browser_height: null,
//     browser_ip: '103.192.116.26',
//     browser_width: null,
//     session_hash: null,
//     user_agent:
//       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
//   },
//   closed_at: null,
//   confirmation_number: '50GCM8NNA',
//   confirmed: true,
//   contact_email: 'teeshoodorders@gmail.com',
//   created_at: '2023-09-24T19:01:21+05:30',
//   currency: 'INR',
//   current_subtotal_price: '299.00',
//   current_subtotal_price_set: {
//     shop_money: {
//       amount: '299.00',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '299.00',
//       currency_code: 'INR',
//     },
//   },
//   current_total_additional_fees_set: null,
//   current_total_discounts: '0.00',
//   current_total_discounts_set: {
//     shop_money: {
//       amount: '0.00',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '0.00',
//       currency_code: 'INR',
//     },
//   },
//   current_total_duties_set: null,
//   current_total_price: '352.82',
//   current_total_price_set: {
//     shop_money: {
//       amount: '352.82',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '352.82',
//       currency_code: 'INR',
//     },
//   },
//   current_total_tax: '53.82',
//   current_total_tax_set: {
//     shop_money: {
//       amount: '53.82',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '53.82',
//       currency_code: 'INR',
//     },
//   },
//   customer_locale: 'en-IN',
//   device_id: null,
//   discount_codes: [],
//   email: 'teeshoodorders@gmail.com',
//   estimated_taxes: false,
//   financial_status: 'pending',
//   fulfillment_status: null,
//   landing_site: '/checkouts/cn/c1-cd1ad7e47623a2b80818ecad41c41060',
//   landing_site_ref: null,
//   location_id: null,
//   merchant_of_record_app_id: null,
//   name: '#1002',
//   note: null,
//   note_attributes: [],
//   number: 2,
//   order_number: 1002,
//   order_status_url:
//     'https://bc174a.myshopify.com/83445055787/orders/b83d7894fed44dca7bd3f365ea45d4db/authenticate?key=b96f5898efbd09fc2953350484aab8b6',
//   original_total_additional_fees_set: null,
//   original_total_duties_set: null,
//   payment_gateway_names: ['Cash on Delivery (COD)'],
//   phone: null,
//   po_number: null,
//   presentment_currency: 'INR',
//   processed_at: '2023-09-24T19:01:20+05:30',
//   reference: '178adac87c49bd2e72367fe488417607',
//   referring_site: 'https://0n3z14b75-a7ba6aefba8ef8a89941.myshopify.dev/',
//   source_identifier: '178adac87c49bd2e72367fe488417607',
//   source_name: 'web',
//   source_url: null,
//   subtotal_price: '299.00',
//   subtotal_price_set: {
//     shop_money: {
//       amount: '299.00',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '299.00',
//       currency_code: 'INR',
//     },
//   },
//   tags: 'CREATED',
//   tax_exempt: false,
//   tax_lines: [
//     {
//       price: '53.82',
//       rate: 0.18,
//       title: 'IGST',
//       price_set: {
//         shop_money: {
//           amount: '53.82',
//           currency_code: 'INR',
//         },
//         presentment_money: {
//           amount: '53.82',
//           currency_code: 'INR',
//         },
//       },
//       channel_liable: false,
//     },
//   ],
//   taxes_included: false,
//   test: false,
//   token: 'b83d7894fed44dca7bd3f365ea45d4db',
//   total_discounts: '0.00',
//   total_discounts_set: {
//     shop_money: {
//       amount: '0.00',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '0.00',
//       currency_code: 'INR',
//     },
//   },
//   total_line_items_price: '299.00',
//   total_line_items_price_set: {
//     shop_money: {
//       amount: '299.00',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '299.00',
//       currency_code: 'INR',
//     },
//   },
//   total_outstanding: '352.82',
//   total_price: '352.82',
//   total_price_set: {
//     shop_money: {
//       amount: '352.82',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '352.82',
//       currency_code: 'INR',
//     },
//   },
//   total_shipping_price_set: {
//     shop_money: {
//       amount: '0.00',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '0.00',
//       currency_code: 'INR',
//     },
//   },
//   total_tax: '53.82',
//   total_tax_set: {
//     shop_money: {
//       amount: '53.82',
//       currency_code: 'INR',
//     },
//     presentment_money: {
//       amount: '53.82',
//       currency_code: 'INR',
//     },
//   },
//   total_tip_received: '0.00',
//   total_weight: 0,
//   updated_at: '2023-09-24T19:15:27+05:30',
//   user_id: null,
//   billing_address: {
//     first_name: 'dropout',
//     address1: 'Q- 427 sukanta nagar, salt lake city',
//     phone: null,
//     city: 'kolkata',
//     zip: '700098',
//     province: 'West Bengal',
//     country: 'India',
//     last_name: 'store',
//     address2: null,
//     company: null,
//     latitude: null,
//     longitude: null,
//     name: 'dropout store',
//     country_code: 'IN',
//     province_code: 'WB',
//   },
//   customer: {
//     id: 7297236599083,
//     email: 'teeshoodorders@gmail.com',
//     accepts_marketing: false,
//     created_at: '2023-09-24T19:01:20+05:30',
//     updated_at: '2023-09-24T19:01:21+05:30',
//     first_name: 'dropout',
//     last_name: 'store',
//     state: 'disabled',
//     note: null,
//     verified_email: true,
//     multipass_identifier: null,
//     tax_exempt: false,
//     phone: null,
//     email_marketing_consent: {
//       state: 'not_subscribed',
//       opt_in_level: 'confirmed_opt_in',
//       consent_updated_at: null,
//     },
//     sms_marketing_consent: null,
//     tags: '',
//     currency: 'INR',
//     accepts_marketing_updated_at: '2023-09-24T19:01:20+05:30',
//     marketing_opt_in_level: null,
//     tax_exemptions: [],
//     admin_graphql_api_id: 'gid://shopify/Customer/7297236599083',
//     default_address: {
//       id: 9420841222443,
//       customer_id: 7297236599083,
//       first_name: 'dropout',
//       last_name: 'store',
//       company: null,
//       address1: 'Q- 427 sukanta nagar, salt lake city',
//       address2: null,
//       city: 'kolkata',
//       province: 'West Bengal',
//       country: 'India',
//       zip: '700098',
//       phone: null,
//       name: 'dropout store',
//       province_code: 'WB',
//       country_code: 'IN',
//       country_name: 'India',
//       default: true,
//     },
//   },
//   discount_applications: [],
//   fulfillments: [],
//   line_items: [
//     {
//       id: 14307524641067,
//       admin_graphql_api_id: 'gid://shopify/LineItem/14307524641067',
//       attributed_staffs: [],
//       fulfillable_quantity: 1,
//       fulfillment_service: 'manual',
//       fulfillment_status: null,
//       gift_card: false,
//       grams: 0,
//       name: 'Iit Kgp Round neck Tshirt - l / blk',
//       price: '299.00',
//       price_set: {
//         shop_money: {
//           amount: '299.00',
//           currency_code: 'INR',
//         },
//         presentment_money: {
//           amount: '299.00',
//           currency_code: 'INR',
//         },
//       },
//       product_exists: true,
//       product_id: 8704379617579,
//       properties: [],
//       quantity: 1,
//       requires_shipping: true,
//       sku: '',
//       taxable: true,
//       title: 'Iit Kgp Round neck Tshirt',
//       total_discount: '0.00',
//       total_discount_set: {
//         shop_money: {
//           amount: '0.00',
//           currency_code: 'INR',
//         },
//         presentment_money: {
//           amount: '0.00',
//           currency_code: 'INR',
//         },
//       },
//       variant_id: 46991707111723,
//       variant_inventory_management: 'shopify',
//       variant_title: 'l / blk',
//       vendor: 'My Store',
//       tax_lines: [
//         {
//           channel_liable: false,
//           price: '53.82',
//           price_set: {
//             shop_money: {
//               amount: '53.82',
//               currency_code: 'INR',
//             },
//             presentment_money: {
//               amount: '53.82',
//               currency_code: 'INR',
//             },
//           },
//           rate: 0.18,
//           title: 'IGST',
//         },
//       ],
//       duties: [],
//       discount_allocations: [],
//     },
//   ],
//   payment_terms: {
//     id: 14217707819,
//     created_at: '2023-09-24T19:01:21+05:30',
//     due_in_days: null,
//     payment_schedules: [
//       {
//         id: 15089860907,
//         amount: '352.82',
//         currency: 'INR',
//         issued_at: null,
//         due_at: null,
//         completed_at: null,
//         created_at: '2023-09-24T19:01:21+05:30',
//         updated_at: '2023-09-24T19:01:21+05:30',
//       },
//     ],
//     payment_terms_name: 'Due on fulfillment',
//     payment_terms_type: 'fulfillment',
//     updated_at: '2023-09-24T19:01:21+05:30',
//   },
//   refunds: [],
//   shipping_address: {
//     first_name: 'dropout',
//     address1: 'Q- 427 sukanta nagar, salt lake city',
//     phone: null,
//     city: 'kolkata',
//     zip: '700098',
//     province: 'West Bengal',
//     country: 'India',
//     last_name: 'store',
//     address2: null,
//     company: null,
//     latitude: 22.560711,
//     longitude: 88.4167583,
//     name: 'dropout store',
//     country_code: 'IN',
//     province_code: 'WB',
//   },
//   shipping_lines: [
//     {
//       id: 4480423067947,
//       carrier_identifier: '650f1a14fa979ec5c74d063e968411d4',
//       code: 'Standard',
//       discounted_price: '0.00',
//       discounted_price_set: {
//         shop_money: {
//           amount: '0.00',
//           currency_code: 'INR',
//         },
//         presentment_money: {
//           amount: '0.00',
//           currency_code: 'INR',
//         },
//       },
//       phone: null,
//       price: '0.00',
//       price_set: {
//         shop_money: {
//           amount: '0.00',
//           currency_code: 'INR',
//         },
//         presentment_money: {
//           amount: '0.00',
//           currency_code: 'INR',
//         },
//       },
//       requested_fulfillment_service_id: null,
//       source: 'shopify',
//       title: 'Standard',
//       tax_lines: [],
//       discount_allocations: [],
//     },
//   ],
// };
