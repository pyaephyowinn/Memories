"use server";

import { saltAndHashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { CustomerRegistrationType } from "@/lib/schemas";

export async function createCustomer(data: CustomerRegistrationType) {
  const hashedPassword = await saltAndHashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: "customer",
    },
  });
  return prisma.customer.create({
    data: {
      userId: user.id,
    },
  });
}
