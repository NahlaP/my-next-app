


import { Request, Response } from 'express';
import CartItem from '../models/Cart';

interface JwtUserPayload {
  id: string;
  isAdmin?: boolean;
  iat?: number;
  exp?: number;
}

// ✅ Get all cart items for a user
export const getUserCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as JwtUserPayload).id;
    const items = await CartItem.find({ userId });
    res.json({ items });
  } catch {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

// ✅ Add item to cart (or increase quantity if it already exists)
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as JwtUserPayload).id;
    const { name, slug, price, quantity, brand, images, productId } = req.body;

    const existingItem = await CartItem.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartItem.create({
        userId,
        productId,
        name,
        slug,
        price,
        quantity,
        brand,
        images,
      });
    }

    // ✅ Return updated cart
    const items = await CartItem.find({ userId });
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

// ✅ Update quantity (increase/decrease)
export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemId = req.params.id;
    const { action } = req.body;

    const cartItem = await CartItem.findById(itemId);
    if (!cartItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    if (action === 'increase') {
      cartItem.quantity += 1;
    } else if (action === 'decrease') {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        res.status(400).json({ message: 'Minimum quantity is 1' });
        return;
      }
    } else {
      res.status(400).json({ message: 'Invalid action. Use "increase" or "decrease".' });
      return;
    }

    await cartItem.save();

    // ✅ Return updated cart
    const userId = (req.user as JwtUserPayload).id;
    const items = await CartItem.find({ userId });
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update cart item' });
  }
};

// ✅ Delete item
export const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemId = req.params.id;
    await CartItem.findByIdAndDelete(itemId);

    // ✅ Return updated cart
    const userId = (req.user as JwtUserPayload).id;
    const items = await CartItem.find({ userId });
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete cart item' });
  }
};

export const clearUserCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as JwtUserPayload).id;
    
    // This line clears the user's cart
    await CartItem.deleteMany({ userId });

    // Respond with an empty cart
    res.status(200).json({ items: [] });
  } catch (error) {
    console.error("Error in clearUserCart:", error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
