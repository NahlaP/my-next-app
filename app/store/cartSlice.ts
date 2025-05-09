



// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   slug: string;
//   name: string;
//   price: number;
//   brand: string;
//   images: string[];
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCartFromServer(state, action: PayloadAction<CartItem[]>) {
//       state.items = action.payload;
//     },
//     addToCart(state, action: PayloadAction<CartItem>) {
//       const existingItem = state.items.find(item => item.slug === action.payload.slug);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
//     increaseQuantity(state, action: PayloadAction<string>) {
//       const item = state.items.find(item => item.slug === action.payload);
//       if (item) {
//         item.quantity += 1;
//       }
//     },
//     decreaseQuantity(state, action: PayloadAction<string>) {
//       const item = state.items.find(item => item.slug === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }
//     },
//     removeFromCart(state, action: PayloadAction<string>) {
//       state.items = state.items.filter(item => item.slug !== action.payload);
//     },
//   },
// });

// export const {
//   setCartFromServer,
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
// } = cartSlice.actions;

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

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromServer(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addToCart(state, action: PayloadAction<CartItem>) {
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
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  setCartFromServer,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart, // ✅ Make sure to export this
} = cartSlice.actions;

export default cartSlice.reducer;

















// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   slug: string;
//   name: string;
//   images: string[];
//   price: number;
//   brand: string;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCartFromServer(state, action: PayloadAction<CartItem[]>) {
//       state.items = action.payload;
//     },
//     addToCart(state, action: PayloadAction<CartItem>) {
//       const item = state.items.find(i => i.slug === action.payload.slug);
//       if (item) {
//         item.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
//     increaseQuantity(state, action: PayloadAction<string>) {
//       const item = state.items.find(i => i.slug === action.payload);
//       if (item) {
//         item.quantity += 1;
//       }
//     },
//     decreaseQuantity(state, action: PayloadAction<string>) {
//       const item = state.items.find(i => i.slug === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }
//     },
//     removeFromCart(state, action: PayloadAction<string>) {
//       state.items = state.items.filter(i => i.slug !== action.payload);
//     },

//     // ✅ Add this clearCart reducer
//     clearCart(state) {
//       state.items = [];
//     },
//   },
// });

// export const {
//   setCartFromServer,
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
//   clearCart, // ✅ Export clearCart here
// } = cartSlice.actions;

// export default cartSlice.reducer;
