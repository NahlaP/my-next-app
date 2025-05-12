// controllers/orderController.ts
import { Request, Response } from 'express';
import Order from '../models/Order';
import { JwtUserPayload } from '../types';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as JwtUserPayload;

    if (!user || !user.id) {
      res.status(401).json({ message: 'Unauthorized. Invalid or missing token.' });
      return;
    }

    const {
      fullName,
      email,
      phone,
      street,
      city,
      state,
      zipCode,
      cardNumber,
      expirationDate,
      cvv,
      cartItems,
    } = req.body;

    if (!cartItems || cartItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    const newOrder = await Order.create({
      user: user.id,
      fullName,
      email,
      phone,
      street,
      city,
      state,
      zipCode,
      cardNumber,
      expirationDate,
      cvv,
      cartItems,
    });

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as JwtUserPayload;

    const orders = await Order.find({ user: user.id }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
