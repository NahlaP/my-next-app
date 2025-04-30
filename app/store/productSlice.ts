// // store/productSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
// }

// interface ProductState {
//   products: Product[];
// }

// const initialState: ProductState = {
//   products: [
//     {
//       id: 1,
//       name: "Product A",
//       description: "This is the description of Product A.",
//       price: 49.99,
//       imageUrl: "https://via.placeholder.com/150",
//     },
//     {
//       id: 2,
//       name: "Product B",
//       description: "This is the description of Product B.",
//       price: 79.99,
//       imageUrl: "https://via.placeholder.com/150",
//     },
//   ],
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     addProduct: (state, action: PayloadAction<Product>) => {
//       state.products.push(action.payload);
//     },
//   },
// });

// export const { addProduct } = productSlice.actions;
// export default productSlice.reducer;  


import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
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
  banner: string | null;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// ✅ Async thunk to fetch products
export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  const response = await axios.get("/api/products"); // Replace with your actual API endpoint
  return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
