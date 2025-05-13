// types/index.ts

export interface OrderItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}



export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

// types/index.ts
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  totalPrice: number;
  orderStatus: string;
  cartItems: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}
