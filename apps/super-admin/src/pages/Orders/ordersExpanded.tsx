// import { db, functions } from '@admin/configs';
// import { Button } from '@mantine/core';
// import {
//   collection,
//   documentId,
//   getDoc,
//   getDocs,
//   query,
//   where,
// } from 'firebase/firestore';
// import { httpsCallable } from 'firebase/functions';
// import React, { useEffect, useState } from 'react';
// import { ShowDesign } from '../products/designs';
// import { designType } from '../products/ProductsExpanded';

// type Props = {
//   order: any;
// };

// export default function OrdersExpanded({ order }: Props) {
//   const [productImages, setProductImages] = useState<any[][]>([[]]);
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     // Define a function to fetch product
//     const fetchProduct = async () => {
//       // const getVariantFunction = httpsCallable(functions, 'getProductImages');
//       try {
//         setLoading(true);
//         const productIds = order.line_items.map((t: any) => t.product_id);
//         const productDb = collection(db, 'Product');
//         const productDocs = await getDocs(
//           query(productDb, where('id', 'in', productIds))
//         );
//         const orderProducts = productDocs.docs.map((d) => d.data());
//         setProducts(orderProducts);

//         // const variantResponse = await getVariantFunction({
//         //   productIds,
//         // });
//         // const images = (await variantResponse.data) as any[];

//         // // And set the product state
//         // setProductImages(
//         //   images.map((imgs) => imgs.value.images.map((i: any) => i.src))
//         // );
//       } catch (error) {
//         console.log(error);
//       } finally {
//         // Finally, set loading to false
//         setLoading(false);
//       }
//     };

//     // Call the fetchProduct function
//     fetchProduct();
//   }, [order.id]);
//   console.log('product from', products);

//   return (
//     <div className="text-center">
//       <h2>Design Files</h2>
//       <div className="grid grid-cols-2 text-center py-8 ">
//         {products.map((product) => (
//           <div className='mx-auto' >
//             <h2>{product.title}</h2>
//             <div className="grid grid-cols-2 gap-2">
//               {product.designs?.map((des: designType) => (
//                 <div>
//                   <ShowDesign design={des} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <Button>Download</Button>
//     </div>
//   );
// }
