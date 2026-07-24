import { prisma } from "@/prisma";
import { hashPassword } from "@/lib/auth/hash-password";
await prisma.user.create({
  data: {
    name: process.env.ADMIN_NAME!,
    email: process.env.ADMIN_EMAIL!,
    phone: process.env.ADMIN_PHONE!,
    password: await hashPassword(process.env.ADMIN_PASSWORD!),
    role: "ADMIN",
  },
});
