import "dotenv/config";
import type { SessionOptions } from "express-session";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

const connectionString = process.env.DATABASE_URL ?? "";
const secret = process.env.EXPRESS_SESSION_SECRET ?? "";

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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
