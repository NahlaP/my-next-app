
// export type Product = {
//     name: string;
//     slug: string;
//     category: string;
//     description: string;
//     images: string[];
//     price: number;
//     brand: string;
//     rating: number;
//     numReviews: number;
//     stock: number;
//     isFeatured: boolean;
//     banner: string | null;
//     quantity?: number; 
//   };
  
// Basic product without quantity
export interface BaseProduct {
  name: string;

  slug: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;

//   banner: string | null;
banner?: string | null; // Make banner optional
}

// Product used inside Cart (with quantity)
export interface Product extends BaseProduct {
  quantity: number;
}



// import { createSlice } from '@reduxjs/toolkit';
// import { Product } from './product';

// interface ProductState {
//   products: Product[];
// }

// const initialState: ProductState = {
//   products: [],
// };

// const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     setProducts(state, action) {
//       state.products = action.payload;
//     },
//   },
// });

// export const { setProducts } = productSlice.actions;
// export default productSlice.reducer;
