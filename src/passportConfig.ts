import type { VerifyFunction } from "passport-local";
import bcrypt from "bcryptjs";

import prisma from "./prisma.ts";

async function getUser(username: string) {
  return await prisma.user.findUnique({ where: { username } });
}

export async function getUserById(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

export const localStrategyOptions: VerifyFunction = async (
  username,
  password,
  done,
) => {
  try {
    const user = await getUser(username);
    if (!user) {
      return done(null, false, { message: "Incorrect Username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect Password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};
