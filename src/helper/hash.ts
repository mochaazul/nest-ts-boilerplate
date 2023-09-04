import { hashSync, genSaltSync, compareSync } from 'bcrypt';

export const hashPassword = (value: string) => {
  const salt = genSaltSync(10);
  const hashed = hashSync(value, salt);
  return hashed;
};

export const compareHash = (raw: string, hashedValue: string) => {
  const match = compareSync(raw, hashedValue);
  return match;
};
