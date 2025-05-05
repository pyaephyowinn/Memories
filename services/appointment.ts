"use server";

import prisma from "@/lib/prisma";
import { AppointmentType } from "@/lib/schemas";
import { verifySession } from "@/lib/session";
import { Prisma } from "@prisma/client";

export async function createAppointment(
  data: Omit<AppointmentType, "hour"> & { listingId: number }
) {
  const session = await verifySession();

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

  if (!customer) {
    throw new Error("Owner cannot create appointment");
  }

  if (!listing) {
    throw new Error("Listing not found");
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

export async function getAppointmentsByCustomer({
  page,
  status,
}: {
  page: number;
  status: string;
}) {
  const session = await verifySession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const where: Prisma.AppointmentWhereInput = {
    customer: {
      userId: session.userId,
    },
  };

  if (status !== "all") {
    where.status = status;
  }

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      include: {
        listing: true,
        customer: {
          include: {
            user: true,
          },
        },
      },
      skip: (page - 1) * 10,
      take: 10,
    }),
    prisma.appointment.count({
      where,
    }),
  ]);

  return {
    appointments,
    total,
  };
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
