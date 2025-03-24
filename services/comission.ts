// services/commissionRecord.ts
"use server";

import prisma from "@/lib/prisma";

export async function createCommissionRecord(data: {
  commissionAmount: number;
  paymentStatus: string;
  listingId: number;
  agentId: number;
}) {
  return prisma.commissionRecord.create({
    data,
  });
}

export async function getCommissionRecordById(id: number) {
  return prisma.commissionRecord.findUnique({
    where: {
      id,
    },
  });
}

export async function updateCommissionRecord(
  id: number,
  data: { commissionAmount?: number; paymentStatus?: string }
) {
  return prisma.commissionRecord.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteCommissionRecord(id: number) {
  return prisma.commissionRecord.delete({
    where: {
      id,
    },
  });
}
