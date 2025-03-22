"use server";

import prisma from "@/lib/prisma";
import { PropertyType } from "@/lib/schemas";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function createProperty(property: PropertyType) {
  const session = await verifySession();

  const owner = await prisma.owner.findUnique({
    where: {
      userId: session.userId,
    },
    select: {
      id: true,
    },
  });

  if (!owner) {
    throw new Error("Owner not found");
  }

  await prisma.listing.create({
    data: {
      ...property,
      ownerId: owner.id,
      verificationStatus: "pending",
    },
  });

  redirect("/d");
}

export function getPropertyById(id: number) {
  return prisma.listing.findUnique({
    where: {
      id,
    },
  });
}

export async function updateProperty(id: number, data: PropertyType) {
  return prisma.listing.update({
    where: {
      id,
    },
    data,
  });
}
