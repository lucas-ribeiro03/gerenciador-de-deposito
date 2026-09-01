import { prisma } from "@/prisma";
import { comparePassword } from "@/lib/auth/compare-password";

type AuthenticateServiceRequest = {
  email: string;
  password: string;
};

export async function authenticateService({
  email,
  password,
}: AuthenticateServiceRequest) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatches = await comparePassword(password, user.password);

  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
  };
}
