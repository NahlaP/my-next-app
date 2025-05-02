import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as { isAdmin?: boolean };

  if (user && user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};
