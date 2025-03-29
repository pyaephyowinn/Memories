"use server";

import { redirect } from "next/navigation";
import { RoleType } from "@/lib/configs";
import { hashPassword, matchPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { CustomerRegistrationType, OwnerRegistrationType } from "@/lib/schemas";
import { createSession, getSession } from "@/lib/session";

export async function createCustomer(
  data: CustomerRegistrationType & { role: RoleType }
) {
  const hashedPassword = await hashPassword(data.password);
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

export async function createOwner(
  data: OwnerRegistrationType & { role: RoleType }
) {
  const hashedPassword = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: data.role,
    },
  });

  await prisma.owner.create({
    data: {
      businessName: data.businessName,
      userId: user.id,
      taxInformation: "",
      licenseNumber: "",
    },
  });

  createSession(user.id);
  redirect("/d");
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
  const isPasswordValid = await matchPassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  createSession(user.id);
  const { password: _, ...rest } = user;
  return rest;
}

export async function getMe() {
  const session = await getSession();

  if (!session) {
    throw new Error("Session not found");
  }

  return prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    omit: {
      password: true,
    },
  });
}
