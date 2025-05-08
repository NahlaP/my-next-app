
  

  
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in your environment variables.');
}


export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, isAdmin } = req.body;


  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ message: 'Invalid email or password' });
    return;
  }

  try {
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, 
    });

  
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error during login:', err.stack);

   
      res.status(500).json({ message: 'Login failed', error: err.message });
    } else {
      console.error('Unexpected error:', err);
      res.status(500).json({ message: 'Login failed', error: 'Unexpected error occurred' });
    }
  
    if (err instanceof Error) {
      console.error('Error during registration:', err.stack);
    } else {
      console.error('Unexpected error during registration:', err);
    }


    res.status(500).json({ 
      message: 'Registration failed', 
      error: err instanceof Error ? err.message : 'Unexpected error occurred' 
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;


  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ message: 'Invalid email or password' });
    return;
  }

  try {
 
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

   
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
     
      console.error('Error during login:', err.stack);

      res.status(500).json({ message: 'Login failed', error: err.message });
    } else {
      console.error('Unexpected error during login:', err);
      res.status(500).json({ message: 'Login failed', error: 'Unexpected error occurred' });
    }
  }
};