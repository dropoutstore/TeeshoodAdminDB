import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { db } from '@admin/configs';


export default function useProductsHook() {
    const { user } = useSelector((state: RootState) => state.user);
    const [products, setProducts] = useState<productType[]>([])
    useEffect(() => {
        const q = query(
          collection(db, 'resellerProducts'),
          orderBy('createdAt', 'desc'),
          where('resellerId', '==', user?.uid),
          limit(10)
        );
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setProducts(snapshot.docs.map((t) => t.data())as productType[]);
        });
    
        // Cleanup function
        return () => unsubscribe();
      }, []);
  return {products}
}

export interface productType {
    id: string;                  // Unique identifier for the product
    name: string;                // Name of the product
    description: string;         // Description of the product
    price: number;               // Price of the product
    category: string;            // Category of the product (e.g., electronics, clothing, etc.)
    stock: number;               // Quantity of the product in stock
    imageUrl: string;            // URL of the product image
    ratings: number;             // Average rating of the product
    discount?: number;           // Optional discount on the product
    designs:string
}


