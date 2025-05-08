// // global.d.ts
// import { JwtPayload } from 'jsonwebtoken';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayload & {
//         _id: string;
//         isAdmin?: boolean;
//       };
//     }
//   }
// }


// export {};
import { JwtUserPayload } from './types'; // adjust if needed

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}
