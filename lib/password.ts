// import { hash, genSalt, compare } from "bcrypt";

// export async function saltAndHashPassword(password: string): Promise<string> {
//   const saltRounds = 10;
//   const salt = await genSalt(saltRounds);
//   const hashedPassword = await hash(password, salt);
//   return hashedPassword;
// }

// export async function verifyPassword(
//   password: string,
//   hashedPassword: string
// ): Promise<boolean> {
//   return await compare(password, hashedPassword);
// }

import { randomBytes, scryptSync } from "crypto";

const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString("hex");
};

/**
 * Hash password with random salt
 * @return {string} password hash followed by salt
 *  XXXX till 64 XXXX till 32
 *
 */
export const hashPassword = (password: string): string => {
  // Any random string here (ideally should be at least 16 bytes)
  const salt = randomBytes(16).toString("hex");
  return encryptPassword(password, salt) + salt;
};

// fetch the user from your db and then use this function

/**
 * Match password against the stored hash
 */
export const matchPassword = (password: string, hash: string): Boolean => {
  // extract salt from the hashed string
  // our hex password length is 32*2 = 64
  const salt = hash.slice(64);
  const originalPassHash = hash.slice(0, 64);
  const currentPassHash = encryptPassword(password, salt);
  return originalPassHash === currentPassHash;
};
