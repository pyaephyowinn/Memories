"use server";

import prisma from "@/lib/prisma";

export async function createRentalRecord(data: {
  rentalPrice: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  listingId: number;
  tenantId: number;
}) {
  return prisma.rentalRecord.create({
    data,
  });
}

export async function getRentalRecordById(id: number) {
  return prisma.rentalRecord.findUnique({
    where: {
      id,
    },
  });
}

export async function updateRentalRecord(
  id: number,
  data: { rentalPrice?: number; leaseStartDate?: Date; leaseEndDate?: Date }
) {
  return prisma.rentalRecord.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteRentalRecord(id: number) {
  return prisma.rentalRecord.delete({
    where: {
      id,
    },
  });
}
