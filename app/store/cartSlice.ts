






// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {
//   fetchCartFromServer,
//   addCartItemToServer,
//   updateCartItemQuantity,
//   deleteCartItem,
// } from './cartActions'; // make sure the path is correct

// export interface CartItem {
//   _id: string;
//   productId: string;
//   slug: string;
//   name: string;
//   quantity: number;
//   price: number;
//   images: string[];
//   brand: string;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find(item => item._id === action.payload._id);
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(item => item._id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//     setCartFromServer: (state, action: PayloadAction<CartItem[]>) => {
//       state.items = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartFromServer.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
//         state.items = action.payload;
//       })
//       .addCase(addCartItemToServer.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
//         state.items = action.payload;
//       })
//       .addCase(updateCartItemQuantity.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
//         state.items = action.payload;
//       })
//       .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
//         state.items = action.payload;
//       });
//   },
// });

// export const { addToCart, removeFromCart, clearCart, setCartFromServer } = cartSlice.actions;
// export default cartSlice.reducer;





import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCartFromServer,
  addCartItemToServer,
  updateCartItemQuantity,
  deleteCartItem,
  clearCartOnServer,
} from './cartActions';

export interface CartItem {
  _id: string;
  productId: string;
  slug: string;
  name: string;
  quantity: number;
  price: number;
  images: string[];
  brand: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCartFromServer: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromServer.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      })
      .addCase(addCartItemToServer.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      })
      .addCase(clearCartOnServer.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, clearCart, setCartFromServer } = cartSlice.actions;
export default cartSlice.reducer;
