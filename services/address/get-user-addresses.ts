import { prisma } from "@/prisma/prisma";

export async function getUserAddresses(userId: string) {
  const addresses = await prisma.address.findMany({
    where: {
      userId,
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
    orderBy: [
      {
        lastUsedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return addresses.map((address) => ({
    ...address,
    lastUsedAt: address.lastUsedAt?.toISOString() ?? null,
  }));
}
