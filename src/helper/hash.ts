import { compareSync, hashSync } from 'bcrypt';

export const hashPassword = (value: string) => {
  const salt = process.env.SALT ?? 13;
  const hashed = hashSync(value, salt);
  return hashed;
};

export const compareHash = (raw: string, hashedValue: string) => {
  return compareSync(raw, hashedValue);
};
