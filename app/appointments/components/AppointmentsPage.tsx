"use client";

const dummy = [
  {
    id: "TR-001",
    date: "Mar 15, 2024",
    property: "Luxury Penthouse with View",
    client: "Robert Wilson",
    type: "sale",
    amount: "$1,200,000",
    status: "completed",
  },
  {
    id: "TR-002",
    date: "Mar 10, 2024",
    property: "Cozy Studio Near Park",
    client: "Emma Davis",
    type: "rental",
    amount: "$1,500",
    status: "completed",
  },
  {
    id: "TR-003",
    date: "Mar 5, 2024",
    property: "Modern Apartment in Downtown",
    client: "James Taylor",
    type: "installment",
    amount: "$5,000",
    status: "completed",
  },
  {
    id: "TR-004",
    date: "Mar 1, 2024",
    property: "Spacious Family Home",
    client: "Michael Brown",
    type: "commission",
    amount: "$16,500",
    status: "pending",
  },
  {
    id: "TR-005",
    date: "Feb 25, 2024",
    property: "Modern Apartment in Downtown",
    client: "James Taylor",
    type: "installment",
    amount: "$5,000",
    status: "completed",
  },
  {
    id: "TR-006",
    date: "Feb 20, 2024",
    property: "Cozy Studio Near Park",
    client: "Emma Davis",
    type: "rental",
    amount: "$1,500",
    status: "failed",
  },
  {
    id: "TR-007",
    date: "Feb 15, 2024",
    property: "Modern Apartment in Downtown",
    client: "James Taylor",
    type: "installment",
    amount: "$5,000",
    status: "completed",
  },
];

import { DataTable } from "@/components/core/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { Download, FileText, Filter, Search } from "lucide-react";

export default function AppointmentPage() {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "property",
      header: "Property",
    },
    {
      accessorKey: "client",
      header: "Client",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
  ];

  return (
    <div className="container mx-auto flex flex-col gap-6 py-4 md:py-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            View and manage your appointments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sale">Sale</SelectItem>
              <SelectItem value="rental">Rental</SelectItem>
              <SelectItem value="installment">Installment</SelectItem>
              <SelectItem value="commission">Commission</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <DataTable data={dummy} total={dummy.length} columns={columns} />
    </div>
  );
}
