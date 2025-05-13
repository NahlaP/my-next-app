

// // controllers/adminUserController.ts
// import { Request, Response } from 'express';
// import User from '../models/User';

// // GET all users
// export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const users = await User.find().select('-password');
//     res.status(200).json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch users' });
//   }
// };

// // GET user by ID
// export const getUserById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await User.findById(req.params.id).select('-password');
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch user' });
//   }
// };

// // PUT update user
// export const updateUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     const { name, email, isAdmin } = req.body;
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (typeof isAdmin === 'boolean') user.isAdmin = isAdmin;

//     await user.save();
//     res.status(200).json({ message: 'User updated successfully', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to update user' });
//   }
// };

// // DELETE user
// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to delete user' });
//   }
// };
import { Request, Response } from 'express';
import User from '../models/User';

// GET all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    const mappedUsers = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.isAdmin ? 'admin' : 'user',
    }));
    res.status(200).json(mappedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// GET user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.isAdmin ? 'admin' : 'user',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

// PUT update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { name, email, role } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.isAdmin = role === 'admin';

    await user.save();
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.isAdmin ? 'admin' : 'user',
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// DELETE user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
