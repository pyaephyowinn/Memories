"use server";

import { RoleType } from "@/lib/configs";
import { saltAndHashPassword, verifyPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { CustomerRegistrationType } from "@/lib/schemas";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function createCustomer(
  data: CustomerRegistrationType & { role: RoleType }
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

  await prisma.customer.create({
    data: {
      userId: user.id,
    },
  });

  createSession(user.id);
  redirect("/profile");
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

  createSession(user.id);
  redirect("/profile");
}
