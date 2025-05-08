


// import { Request, Response } from 'express';
// import Cart from '../models/Cart';

// export const getUserCart = async (req: Request, res: Response) => {
//     try {
//       const userId = (req.user as { _id: string })._id;
//       const items = await Cart.find({ userId });
//       res.status(200).json({ items });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to fetch cart', error });
//     }
//   };

// export const addToCart = async (req: Request, res: Response): Promise<void> => {
//     const userId = (req.user as { id: string })?.id;
//     const { name, slug, price, quantity, brand, images } = req.body;
  
//     if (!userId) {
//       res.status(401).json({ message: 'Unauthorized: Missing userId' });
//       return;
//     }
  
//     try {
//       const cartItem = new Cart({
//         userId,
//         name,
//         slug,
//         price,
//         quantity,
//         brand,
//         images,
//       });
  
//       await cartItem.save();
  
//       res.status(201).json({ message: 'Item added to cart', cartItem });
//     } catch (err: unknown) {
//       console.error('Error adding to cart:', err);
//       res.status(500).json({
//         message: 'Failed to add item',
//         error: err instanceof Error ? err.message : 'Unexpected error',
//       });
//     }
//   };
  
//   export const updateCartItem = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const { quantity } = req.body;
  
//       const updatedItem = await Cart.findByIdAndUpdate(
//         id,
//         { quantity },
//         { new: true }
//       );
  
//       res.json(updatedItem);
//     } catch (err) {
//       res.status(500).json({ message: 'Failed to update cart item', error: err });
//     }
//   };
  
  

  
//   export const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const cartItemId = req.params.id;
//       const deletedItem = await Cart.findByIdAndDelete(cartItemId);
  
//       if (!deletedItem) {
//         res.status(404).json({ message: "Cart item not found" });
//         return;
//       }
  
//       res.status(200).json({ message: "Item removed from cart", deletedItem });
//     } catch (error) {
//       console.error("Failed to delete item:", error);
//       res.status(500).json({ message: "Failed to delete item" });
//     }
//   };
  


// import { Request, Response } from 'express';
// import Cart from '../models/Cart'; // Update to your actual Cart model path

// interface JwtUserPayload {
//   id: string;
//   isAdmin?: boolean;
//   iat?: number;
//   exp?: number;
// }

// export const getUserCart = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = (req.user as JwtUserPayload).id;
//     const items = await Cart.find({ userId });
//     res.json({ items });
//   } catch {
//     res.status(500).json({ message: 'Failed to fetch cart' });
//   }
// };

// export const addToCart = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = (req.user as JwtUserPayload).id;
//     const { name, slug, price, quantity, brand, images } = req.body;

//     const newItem = await Cart.create({
//       userId,
//       name,
//       slug,
//       price,
//       quantity,
//       brand,
//       images,
//     });

//     res.status(201).json(newItem);
//   } catch {
//     res.status(500).json({ message: 'Failed to add to cart' });
//   }
// };

// export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const itemId = req.params.id;
//     const update = req.body;

//     const updatedItem = await Cart.findByIdAndUpdate(itemId, update, { new: true });

//     if (!updatedItem) {
//       res.status(404).json({ message: 'Item not found' });
//       return;
//     }

//     res.json(updatedItem);
//   } catch {
//     res.status(500).json({ message: 'Failed to update cart item' });
//   }
// };

// export const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const itemId = req.params.id;

//     const deletedItem = await Cart.findByIdAndDelete(itemId);

//     if (!deletedItem) {
//       res.status(404).json({ message: 'Item not found' });
//       return;
//     }

//     res.json({ message: 'Item deleted' });
//   } catch {
//     res.status(500).json({ message: 'Failed to delete cart item' });
//   }
// };



import { Request, Response } from 'express';
import Cart from '../models/Cart'; // Update to your actual Cart model path

interface JwtUserPayload {
  id: string;
  isAdmin?: boolean;
  iat?: number;
  exp?: number;
}

export const getUserCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as JwtUserPayload).id;
    const items = await Cart.find({ userId });
    res.json({ items });
  } catch {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as JwtUserPayload).id;
    const { name, slug, price, quantity, brand, images } = req.body;

    const newItem = await Cart.create({
      userId,
      name,
      slug,
      price,
      quantity,
      brand,
      images,
    });

    res.status(201).json(newItem);
  } catch {
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemId = req.params.id;
    const { action } = req.body; // expecting { action: 'increase' } or { action: 'decrease' }

    const cartItem = await Cart.findById(itemId);

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
    res.json(cartItem);
  } catch {
    res.status(500).json({ message: 'Failed to update cart item' });
  }
};

export const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemId = req.params.id;

    const deletedItem = await Cart.findByIdAndDelete(itemId);

    if (!deletedItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.json({ message: 'Item deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete cart item' });
  }
};
