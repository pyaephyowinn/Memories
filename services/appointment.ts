"use server";

import prisma from "@/lib/prisma";

export async function createAppointment(data: {
  dateTime: Date;
  status: string;
  customerId: number;
  listingId: number;
}) {
  return prisma.appointment.create({
    data,
  });
}

export async function getAppointmentById(id: number) {
  return prisma.appointment.findUnique({
    where: {
      id,
    },
  });
}

export async function getAppointmentsByCustomer(customerId: number) {
  return prisma.appointment.findMany({
    where: {
      customerId,
    },
    include: {
      listing: true, // Include listing details in the response
    },
  });
}

export async function updateAppointment(
  id: number,
  data: { dateTime?: Date; status?: string }
) {
  return prisma.appointment.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteAppointment(id: number) {
  return prisma.appointment.delete({
    where: {
      id,
    },
  });
}
