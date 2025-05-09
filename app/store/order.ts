// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface OrderItem {
//   productId: string;
//   quantity: number;
// }

// export interface Order {
//   _id?: string;
//   name: string;
//   address: string;
//   cardNumber: string;
//   items: OrderItem[];
//   totalAmount: number;
//   createdAt?: string;
// }

// interface OrderState {
//   orders: Order[];
// }

// const initialState: OrderState = {
//   orders: [],
// };

// const orderSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     addOrder(state, action: PayloadAction<Order>) {
//       state.orders.push(action.payload);
//     },
//     setOrders(state, action: PayloadAction<Order[]>) {
//       state.orders = action.payload;
//     },
//     clearOrders(state) {
//       state.orders = [];
//     },
//   },
// });

// export const { addOrder, setOrders, clearOrders } = orderSlice.actions;
// export default orderSlice.reducer;
