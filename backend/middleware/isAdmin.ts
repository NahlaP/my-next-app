import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.user === 'object' && 'isAdmin' in req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};
// import { Request, Response, NextFunction } from 'express';

// export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user || typeof req.user !== 'object') {
//     return res.status(401).json({ message: 'Unauthorized access' });
//   }

//   if ('isAdmin' in req.user && req.user.isAdmin === true) {
//     next();
//   } else {
//     res.status(403).json({ message: 'Admin access only' });
//   }
// };
