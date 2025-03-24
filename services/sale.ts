"use server";

import prisma from "@/lib/prisma";

export async function createSaleRecord(data: {
  salePrice: number;
  saleDate: Date;
  listingId: number;
  buyerId: number;
}) {
  return prisma.saleRecord.create({
    data,
  });
}

export async function getSaleRecordById(id: number) {
  return prisma.saleRecord.findUnique({
    where: {
      id,
    },
  });
}

export async function updateSaleRecord(
  id: number,
  data: { salePrice?: number; saleDate?: Date }
) {
  return prisma.saleRecord.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteSaleRecord(id: number) {
  return prisma.saleRecord.delete({
    where: {
      id,
    },
  });
}
