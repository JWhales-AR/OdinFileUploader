import "dotenv/config";
import type { SessionOptions } from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import prisma from "./prisma.ts";

const secret = process.env.EXPRESS_SESSION_SECRET ?? "";

const sessionConfig: SessionOptions = {
  cookie: {
    maxAge: 30 * 60 * 1000,
  },
  secret,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};

export default sessionConfig;
