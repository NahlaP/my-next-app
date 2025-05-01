import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in your environment variables.');
  }

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
  
      console.log('User from DB:', user);  // Log the full user object
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Entered Password:', password);  // Log the entered password
      console.log('Hashed Password in DB:', user.password);  // Log the stored hash
  
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Login failed', error: err });
    }
  };
  