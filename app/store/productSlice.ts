

// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export interface Product {
//   name: string;
//   slug: string;
//   category: string;
//   description: string;
//   images: string[];
//   price: number;
//   brand: string;
//   rating: number;
//   numReviews: number;
//   stock: number;
//   isFeatured: boolean;
//   banner: string | null;
// }

// interface ProductState {
//   products: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   products: [],
//   loading: false,
//   error: null,
// };


// export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
//   const response = await axios.get("/api/products"); // Replace with your actual API endpoint
//   return response.data;
// });

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     addProduct: (state, action: PayloadAction<Product>) => {
//       state.products.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
//         state.products = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to load products";
//       });
//   },
// });

// export const { addProduct } = productSlice.actions;
// export default productSlice.reducer;
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  _id: string;  // added _id for tracking the product in the backend
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

// Async Thunks
export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  const response = await axios.get("/api/products"); // Replace with your actual API endpoint
  return response.data;
});

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product: Product) => {
    const response = await axios.post("/api/products", product);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product: Product) => {
    const response = await axios.put(`/api/products/${product._id}`, product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId: string) => {
    await axios.delete(`/api/products/${productId}`);
    return productId;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
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
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
