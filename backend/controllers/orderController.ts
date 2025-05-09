// // controllers/orderController.ts
// import { Request, Response } from 'express';
// import Order from '../models/Order';
// import { JwtUserPayload } from '../types';

// export const createOrder = async (req: Request, res: Response) => {
//   const user = req.user as JwtUserPayload;
//   const { name, address, cardNumber, items, totalAmount } = req.body;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ message: 'Cart is empty' });
//   }

//   try {
//     const newOrder = await Order.create({
//       user: user.id,
//       name,
//       address,
//       cardNumber,
//       items,
//       totalAmount,
//     });

//     res.status(201).json({ message: 'Order placed successfully', order: newOrder });
//   } catch (err) {
//     console.error('Order creation error:', err);
//     res.status(500).json({ message: 'Failed to place order' });
//   }
// };
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

    const { name, address, cardNumber, items, totalAmount } = req.body;

    if (!name || !address || !cardNumber || !items || items.length === 0 || !totalAmount) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const newOrder = await Order.create({
      user: user.id,
      name,
      address,
      cardNumber,
      items,
      totalAmount,
    });

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });

  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Failed to place order', error: err });
  }
};
