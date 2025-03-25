"use server";

import prisma from "@/lib/prisma";
import { PropertyType } from "@/lib/schemas";
import { verifySession } from "@/lib/session";

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

  return prisma.listing.create({
    data: {
      ...property,
      ownerId: owner.id,
      verificationStatus: "pending",
    },
  });
}

export async function getTop4Properties() {
  return prisma.listing.findMany({
    take: 4,
  });
}

export async function getPropertyById(id: number) {
  return prisma.listing.findUnique({
    where: {
      id,
    },
    include: {
      owner: {
        include: {
          user: true,
        },
      },
    },
  });
}

export async function updateProperty(id: number, data: PropertyType) {
  console.log("data", data);
  return prisma.listing.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProperty(id: number) {
  return prisma.listing.delete({
    where: {
      id,
    },
  });
}

export async function getPropertiesByOwner() {
  try {
    const session = await verifySession();
    const owner = await prisma.owner.findUnique({
      where: {
        userId: session.userId,
      },
    });

    if (!owner) {
      throw new Error("Owner not found");
    }

    return prisma.listing.findMany({
      where: {
        ownerId: owner.id,
      },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}
