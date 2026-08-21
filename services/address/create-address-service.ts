import { prisma } from "@/prisma/prisma";

type CreateAddressServiceInput = {
  userId: string;
  title: string;
  street: string;
  number: string;
  district: string;
  zipCode?: string;
  complement?: string;
};

export async function createAddressService({
  userId,
  title,
  street,
  number,
  district,
  zipCode,
  complement,
}: CreateAddressServiceInput) {
  const address = await prisma.address.create({
    data: {
      userId,
      title,
      street,
      number,
      district,
      zipCode: zipCode || "",
      complement: complement || null,
    },
    select: {
      id: true,
      title: true,
      street: true,
      number: true,
      district: true,
      zipCode: true,
      complement: true,
      lastUsedAt: true,
    },
  });
  return {
    ...address,
    lastUsedAt: address.lastUsedAt?.toISOString() ?? null,
  };
}
