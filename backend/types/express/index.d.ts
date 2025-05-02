// types/express/index.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload ;
    }
  }
}
export {};

// import { JwtPayload } from 'jsonwebtoken';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayload & { id: string; isAdmin: boolean };
//     }
//   }
// }

// export {};
