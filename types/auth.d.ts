import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "EMPLOYEE" | "CLIENT";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "ADMIN" | "EMPLOYEE" | "CLIENT";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "EMPLOYEE" | "CLIENT";
  }
}
