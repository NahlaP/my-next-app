
export interface JwtUserPayload {
    id: string;
    isAdmin?: boolean;
    iat?: number;
    exp?: number;
  }
  