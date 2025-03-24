// services/installmentRecord.ts
"use server";

import prisma from "@/lib/prisma";

export async function createInstallmentRecord(data: {
  installmentAmount: number;
  dueDate: Date;
  paidDate?: Date;
  paymentStatus: string;
  paymentMethod?: string;
  lateFee?: number;
  notes?: string;
  listingId: number;
  userId: number;
}) {
  return prisma.installmentRecord.create({
    data,
  });
}

export async function getInstallmentRecordById(id: number) {
  return prisma.installmentRecord.findUnique({
    where: {
      id,
    },
  });
}

export async function getInstallmentsByListing(listingId: number) {
  return prisma.installmentRecord.findMany({
    where: {
      listingId,
    },
    include: {
      user: true, // Include user details in the response
    },
  });
}

export async function updateInstallmentRecord(
  id: number,
  data: {
    installmentAmount?: number;
    dueDate?: Date;
    paidDate?: Date;
    paymentStatus?: string;
    paymentMethod?: string;
    lateFee?: number;
    notes?: string;
  }
) {
  return prisma.installmentRecord.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteInstallmentRecord(id: number) {
  return prisma.installmentRecord.delete({
    where: {
      id,
    },
  });
}
