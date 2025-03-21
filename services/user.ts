"use server";

import { saltAndHashPassword, verifyPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { CustomerRegistrationType } from "@/lib/schemas";

export async function createCustomer(
  data: CustomerRegistrationType & { role: string }
) {
  const hashedPassword = await saltAndHashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: data.role,
    },
  });
  return prisma.customer.create({
    data: {
      userId: user.id,
    },
  });
}

export async function login(email: string, password: string) {
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
