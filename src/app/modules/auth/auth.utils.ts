/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: any; role: any },
  secret: Secret,
  expiresIn: any,
) => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(jwtPayload, secret, options);
};

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import jwt from 'jsonwebtoken';
// export const createToken = (
//   jwtPayload: { email: any; role: any },
//   secret: jwt.Secret,
//   expiresIn: string | number,
// ) => {
//   return jwt.sign(jwtPayload, secret, { expiresIn });
// };
