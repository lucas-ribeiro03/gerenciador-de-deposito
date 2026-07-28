import { prisma } from "@/prisma";
import { hashPassword } from "@/lib/auth/hash-password";

type CreateUserServiceRequest = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export async function createUserService({
  name,
  email,
  phone,
  password,
}: CreateUserServiceRequest) {
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userAlreadyExists) {
    return {
      success: false,
      message: "Já existe um usuário cadastrado com este e-mail.",
    };
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Conta criada com sucesso.",
  };
}
