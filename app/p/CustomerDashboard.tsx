"use client";

import type React from "react";
import Link from "next/link";
import { Calendar, CheckCircle, XCircle, UserRound } from "lucide-react";
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
import { ProfileTab } from "@/app/d/components/ProfileTab";

export function CustomerDashboard({
  appointments,
}: {
  appointments: Prisma.AppointmentGetPayload<{
    include: {
      listing: { include: { owner: { include: { user: true } } } };
      customer: { include: { user: true } };
    };
  }>[];
}) {
  return (
    <div className="flex-1 py-6 md:py-10 container mx-auto">
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">
            <Calendar className="mr-2 h-4 w-4" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="profile">
            <UserRound className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

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
                    <TableHead>Owner</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Message (location)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        {appointment.listing?.owner.user.username}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/properties/${appointment.listing.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {appointment.listing.title}
                        </Link>
                      </TableCell>
                      <TableCell>{formatDate(appointment.dateTime)}</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <ProfileTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
