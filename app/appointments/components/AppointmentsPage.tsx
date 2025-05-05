"use client";

import { DataTable } from "@/components/core/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/date";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useQueryState } from "nuqs";

type Appointment = Prisma.AppointmentGetPayload<{
  include: { listing: true; customer: { include: { user: true } } };
}>;

export function AppointmentPage({
  appointments,
  total,
}: {
  appointments: Appointment[];
  total: number;
}) {
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "all",
  });

  const columns: ColumnDef<Appointment>[] = [
    {
      accessorKey: "dateTime",
      header: "Date",
      cell: ({ row }) => {
        return <div>{formatDate(row.original.dateTime)}</div>;
      },
    },
    {
      accessorKey: "listing.title",
      header: "Property",
    },
    {
      accessorKey: "customer.user.username",
      header: "Client",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Badge
            variant={
              row.original.status === "declined" ? "destructive" : "outline"
            }
          >
            {row.original.status === "accept"
              ? "Accepted"
              : row.original.status === "pending"
              ? "Pending"
              : "Declined"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/appointments/${row.original.id}`}>View</Link>
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex-1 container mx-auto flex flex-col gap-6 py-4 md:py-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            View and manage your appointments
          </p>
        </div>

        <div className="flex gap-2">
          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(value, {
                shallow: false,
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable data={appointments} total={total} columns={columns} />
    </div>
  );
}
