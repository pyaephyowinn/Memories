"use server";

import prisma from "@/lib/prisma";
import { AppointmentType } from "@/lib/schemas";
import { getSession } from "@/lib/session";

export async function createAppointment(
  data: Omit<AppointmentType, "hour"> & { listingId: number }
) {
  const session = await getSession();

  if (!session) {
    throw new Error("Session not found");
  }

  const [customer, listing] = await Promise.all([
    prisma.customer.findUnique({
      where: {
        userId: session.userId,
      },
    }),
    prisma.listing.findUnique({
      where: {
        id: data.listingId,
      },
    }),
  ]);

  if (!customer || !listing) {
    throw new Error("Customer or listing not found");
  }

  return prisma.appointment.create({
    data: {
      dateTime: data.dateTime,
      message: data.message,
      status: "pending",
      customerId: customer.id,
      listingId: listing.id,
    },
  });
}

export async function getAppointment(id: number) {
  return prisma.appointment.findUnique({
    where: {
      id,
    },
    include: {
      listing: true,
      customer: {
        include: {
          user: true,
        },
      },
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

export async function acceptAppointment(id: number) {
  return prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status: "accept",
    },
  });
}

export async function declineAppointment(id: number) {
  return prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status: "declined",
    },
  });
}
