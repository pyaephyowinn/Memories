"use server";

import prisma from "@/lib/prisma";
import { CustomerRegistrationType } from "@/lib/schemas";

export async function createCustomer(data: CustomerRegistrationType) {
  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: "customer",
    },
  });
  return prisma.customer.create({
    data: {
      userId: user.id,
    },
  });
}
