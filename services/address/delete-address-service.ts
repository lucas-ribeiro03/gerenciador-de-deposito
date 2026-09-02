import { prisma } from "@/prisma/prisma";

export const deleteAddressService = async (id: string) => {
  await prisma.address.delete({
    where: { id },
  });

  return {
    message: "Endereço removido",
    success: true,
  };
};
