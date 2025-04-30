
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Product {
//   slug: string;
//   name: string;
//   price: number;
//   brand: string;
//   images: string[];
//   quantity: number; // Add this line
// }

// interface CartState {
//   items: Product[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<Product>) => {
//         const existingProduct = state.items.find(item => item.slug === action.payload.slug);
//         if (existingProduct) {
//           existingProduct.quantity += 1; // Increase quantity if already exists
//         } else {
//           state.items.push({ ...action.payload, quantity: 1 }); // 👈 Set quantity 1 when first adding
//         }
//       },
      
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(item => item.slug !== action.payload);
//     },
//     increaseQuantity: (state, action: PayloadAction<string>) => {
//       const product = state.items.find(item => item.slug === action.payload);
//       if (product) product.quantity += 1;
//     },
//     decreaseQuantity: (state, action: PayloadAction<string>) => {
//       const product = state.items.find(item => item.slug === action.payload);
//       if (product && product.quantity > 1) product.quantity -= 1;
//     },
//   },
// });

// export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  slug: string;
  name: string;
  price: number;
  brand: string;
  images: string[];
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

  
    addToCart: (state, action) => {
        const existingItem = state.items.find(item => item.slug === action.payload.slug);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push(action.payload);
        }
      },
      
      
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.slug === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(item => item.slug === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.slug !== action.payload);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
