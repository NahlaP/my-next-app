
  

//   import { Request, Response } from 'express';
// import User from '../models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET!;

// if (!JWT_SECRET) {
//     throw new Error('JWT_SECRET is not defined in your environment variables.');
//   }


//   export const signUp = async (req: Request, res: Response): Promise<void> => {
//     const { name, email, password, isAdmin } = req.body; // ✅ include isAdmin
  
//     try {
//       const userExists = await User.findOne({ email });
//       if (userExists) {
//         res.status(400).json({ message: 'User already exists' });
//         return;
//       }
  
//       const hashed = await bcrypt.hash(password, 10);
//       await User.create({ name, email, password: hashed, isAdmin: isAdmin || false }); // ✅ use isAdmin
  
//       res.status(201).json({ message: 'User registered' });
//     } catch (err) {
//       res.status(500).json({ message: 'Registration failed', error: err });
//     }
//   };
  

// export const login = async (req: Request, res: Response): Promise<void> => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         res.status(400).json({ message: 'Invalid credentials' });
//         return;
//       }
  
//       console.log('User from DB:', user);  // Log the full user object
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       console.log('Entered Password:', password);  // Log the entered password
//       console.log('Hashed Password in DB:', user.password);  // Log the stored hash
  
//       if (!isMatch) {
//         res.status(400).json({ message: 'Invalid credentials' });
//         return;
//       }
  
//       const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin}, JWT_SECRET, { expiresIn: '1d' });
//       res.json({ 
//         token, 
//         user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } 
//       });
      
//     } catch (err) {
//       console.error('Error during login:', err);
//       res.status(500).json({ message: 'Login failed', error: err });
//     }
//   };
  
  

  
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in your environment variables.');
}

// SignUp Handler
export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, isAdmin } = req.body;

  // Basic validation for email and password
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ message: 'Invalid email or password' });
    return;
  }

  try {
    // Check if the user already exists
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

    // Create JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1d' });

    // Send response with the token and user info
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
      // Log the full error stack for debugging
      console.error('Error during login:', err.stack);

      // Send error response
      res.status(500).json({ message: 'Login failed', error: err.message });
    } else {
      console.error('Unexpected error during login:', err);
      res.status(500).json({ message: 'Login failed', error: 'Unexpected error occurred' });
    }
  }
};
