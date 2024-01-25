import { TokenPayload, User } from '@project/libs/app/types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
}
