"use client";

import type React from "react";
import Link from "next/link";
import {
  Home,
  PlusCircle,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/date";
import { Prisma } from "@prisma/client";
import { DashboardCard } from "./DashboardCard";
import { ProfileTab } from "./ProfileTab";

type DashboardPageProps = {
  properties: Prisma.ListingGetPayload<{}>[];
  appointments: Prisma.AppointmentGetPayload<{
    include: { listing: true; customer: { include: { user: true } } };
  }>[];
};

export function DashboardPage({
  properties,
  appointments,
}: DashboardPageProps) {
  return (
    <div className="flex-1 py-6 md:py-10 container mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your properties, appointments, and transactions
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/properties/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Property
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Properties"
            value="12"
            description="4 active listings"
            icon={Home}
          />
          <DashboardCard
            title="Appointments"
            value="8"
            description="3 pending requests"
            icon={Calendar}
          />
        </div>

        <Tabs defaultValue="appointments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="properties">
              <Home className="mr-2 h-4 w-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <DollarSign className="mr-2 h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="profile">
              <UserRound className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Properties</CardTitle>
                <CardDescription>
                  Manage and monitor your property listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">
                          {property.title}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              property.status === "available"
                                ? "default"
                                : property.status === "sold"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {property.status.charAt(0).toUpperCase() +
                              property.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {property.price.toLocaleString()} {property.currency}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/properties/${property.id}/edit`}>
                              Edit
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href="/properties/my">View All Properties</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>
                  Manage your property viewing appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Message (location)</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          {appointment.customer.user.username}
                        </TableCell>
                        <TableCell>{appointment.listing?.title}</TableCell>
                        <TableCell>
                          {formatDate(appointment.dateTime)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              appointment.status === "declined"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {appointment.status === "accept"
                              ? "Accepted"
                              : appointment.status === "pending"
                              ? "Pending"
                              : "Declined"}
                          </Badge>
                        </TableCell>
                        <TableCell>{appointment.message}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {appointment.status === "pending" && (
                              <>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="sr-only">Confirm</span>
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                  <span className="sr-only">Decline</span>
                                </Button>
                              </>
                            )}
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/appointments/${appointment.id}`}>
                                View
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href="/appointments">View All Appointments</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Track your property sales, rentals, and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "1",
                        property: "Luxury Penthouse with View",
                        type: "sale",
                        client: "Robert Wilson",
                        amount: "$1,200,000",
                        date: "Feb 28, 2024",
                      },
                      {
                        id: "2",
                        property: "Cozy Studio Near Park",
                        type: "rental",
                        client: "Emma Davis",
                        amount: "$1,500",
                        date: "Mar 1, 2024",
                      },
                      {
                        id: "3",
                        property: "Modern Apartment in Downtown",
                        type: "installment",
                        client: "James Taylor",
                        amount: "$5,000",
                        date: "Mar 5, 2024",
                      },
                    ].map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.property}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.type === "sale"
                                ? "default"
                                : transaction.type === "rental"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {transaction.type.charAt(0).toUpperCase() +
                              transaction.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.client}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell className="text-right">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/transactions/${transaction.id}`}>
                              Details
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href="/transactions">View All Transactions</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
