// services/paymentRecord.ts
"use server";

import prisma from "@/lib/prisma";

export async function createPaymentRecord(data: {
  amount: number;
  paymentDate: Date;
  paymentType: string;
  userId: number;
  listingId: number;
  customerId?: number;
}) {
  return prisma.paymentRecord.create({
    data,
  });
}

export async function getPaymentRecordById(id: number) {
  return prisma.paymentRecord.findUnique({
    where: {
      id,
    },
  });
}

export async function updatePaymentRecord(
  id: number,
  data: { amount?: number; paymentDate?: Date; paymentType?: string }
) {
  return prisma.paymentRecord.update({
    where: {
      id,
    },
    data,
  });
}

export async function deletePaymentRecord(id: number) {
  return prisma.paymentRecord.delete({
    where: {
      id,
    },
  });
}

export async function getPaymentsByUser(userId: number) {
  return prisma.paymentRecord.findMany({
    where: {
      userId,
    },
    include: {
      listing: true, // Include listing details in the response
    },
  });
}
