import { prisma } from "@/prisma/prisma";

import type { UpdateProfileInput } from "@/schemas/profile/update-profile-schema";

export async function updateProfileService(
  userId: string,
  data: UpdateProfileInput,
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.name,
      phone: data.phone,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
    },
  });
}
