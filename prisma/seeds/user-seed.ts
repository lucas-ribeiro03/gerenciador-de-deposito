import { prisma } from "@/prisma";
import { hashPassword } from "@/lib/auth/hash-password";
export async function seedUsers() {
  const admin = await prisma.user.findUnique({
    where: {
      email: "admin@pointdogrell.com",
    },
  });

  if (admin) {
    console.log("✔ Usuário administrador já existe.");
    return;
  }
  await prisma.user.create({
    data: {
      name: process.env.ADMIN_NAME!,
      email: process.env.ADMIN_EMAIL!,
      phone: process.env.ADMIN_PHONE!,
      password: await hashPassword(process.env.ADMIN_PASSWORD!),
      role: "ADMIN",
    },
  });
}
