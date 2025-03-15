"use client"

import Link from "next/link"
import { Home, FileText, Download, Filter, Search, ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <Home className="h-6 w-6" />
          <span>Acme Real Estate</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/properties">Properties</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/appointments">Appointments</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/transactions">Transactions</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
              <p className="text-muted-foreground">Manage your property sales, rentals, and payments</p>
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
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
                ].map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.property}</TableCell>
                    <TableCell>{transaction.client}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.type === "sale"
                            ? "default"
                            : transaction.type === "rental"
                              ? "secondary"
                              : transaction.type === "commission"
                                ? "outline"
                                : "default"
                        }
                      >
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{transaction.amount}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "default"
                            : transaction.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Download receipt</DropdownMenuItem>
                          <DropdownMenuItem>Send to email</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Showing 7 of 42 transactions</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

