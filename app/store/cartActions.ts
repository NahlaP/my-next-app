


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartSlice";

const getToken = () => localStorage.getItem("token");

export const fetchCartFromServer = createAsyncThunk("cart/fetchCart", async () => {
  const token = getToken();
  const response = await axios.get("http://localhost:5000/api/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.items;
});

export const addCartItemToServer = createAsyncThunk(
  "cart/addItem",
  async (item: Omit<CartItem, "_id">) => {
    const token = getToken();
    const response = await axios.post("http://localhost:5000/api/cart/add", item, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.items;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateItem",
  async ({ id, action }: { id: string; action: "increase" | "decrease" }) => {
    const token = getToken();
    const response = await axios.patch(
      `http://localhost:5000/api/cart/${id}`,
      { action },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.items;
  }
);

export const deleteCartItem = createAsyncThunk("cart/deleteItem", async (id: string) => {
  const token = getToken();
  const response = await axios.delete(`http://localhost:5000/api/cart/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.items;
});

export const clearCartOnServer = createAsyncThunk("cart/clear", async () => {
  const token = getToken();
  const res = await axios.delete("http://localhost:5000/api/cart/clear", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.items; 
});
