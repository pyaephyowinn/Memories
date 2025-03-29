"use server";

import prisma from "@/lib/prisma";
import { PropertyFilterType, PropertyType } from "@/lib/schemas";
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

export async function searchProperties({
  title,
  location,
  minPrice,
  maxPrice,
  minBeds,
  minBath,
  propertyTypes,
  listingType,
  minSize,
  maxSize,
  features,
}: PropertyFilterType) {
  console.log("features", features);
  return prisma.listing.findMany({
    where: {
      title: {
        contains: title ?? undefined,
        mode: "insensitive",
      },
      city: {
        contains: location ?? undefined,
        mode: "insensitive",
      },
      streetAddress: {
        contains: location ?? undefined,
        mode: "insensitive",
      },
      state: {
        contains: location ?? undefined,
        mode: "insensitive",
      },
      price: {
        gte: minPrice ?? undefined,
        lte: maxPrice ?? undefined,
      },
      bedrooms: {
        gte: minBeds ?? undefined,
      },
      bathrooms: {
        gte: minBath ?? undefined,
      },
      size: {
        gte: minSize ?? undefined,
        lte: maxSize ?? undefined,
      },
      propertyType: {
        in: propertyTypes ?? undefined,
      },
      features: {
        hasEvery: features ?? [],
      },
      listingType: listingType ?? undefined,
      status: "available",
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

export async function getDashboardProperties() {
  const [properties, appointments] = await Promise.all([
    prisma.listing.findMany({
      take: 4,
    }),
    prisma.appointment.findMany({
      take: 4,
      include: {
        listing: true,
        customer: {
          include: {
            user: true,
          },
        },
      },
    }),
  ]);

  return {
    properties,
    appointments,
  };
}
