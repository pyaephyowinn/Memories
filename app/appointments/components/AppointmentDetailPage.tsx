"use client";

import Link from "next/link";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import { Prisma } from "@prisma/client";
import { formatDateTime } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { acceptAppointment, declineAppointment } from "@/services/appointment";
import { useRouter } from "next/navigation";

type AppointmentDetailPageProps = {
  appointment: Prisma.AppointmentGetPayload<{
    include: { customer: { include: { user: true } }; listing: true };
  }>;
};

export function AppointmentDetailPage({
  appointment,
}: AppointmentDetailPageProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDecline = async () => {
    try {
      await declineAppointment(appointment.id);
      router.push("/appointments");
      toast({
        title: "Success",
        description: "Appointment declined successfully.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong.",
      });
    }
  };

  const handleAccept = async () => {
    try {
      await acceptAppointment(appointment.id);
      router.push("/appointments");
      toast({
        title: "Success",
        description: "Appointment accepted successfully.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong.",
      });
    }
  };

  return (
    <div className="flex-1 mx-auto max-w-2xl space-y-6 container py-4 md:py-8">
      <div className="flex items-center gap-2">
        <Button
          asChild
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <div>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </div>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Appointment Details
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{appointment.customer.user.username}</CardTitle>
          <CardDescription>
            {appointment.customer.user.email} -{" "}
            {appointment.customer.user.phone}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-bold">Status</div>
              <div>
                <Badge
                  className="capitalize"
                  variant={
                    appointment.status === "pending"
                      ? "default"
                      : appointment.status === "declined"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {appointment.status === "pending"
                    ? "Pending"
                    : appointment.status === "declined"
                    ? "Declined"
                    : "Accepted"}
                </Badge>
              </div>
            </div>

            <div>
              <div className="font-bold">Date</div>
              <span>{formatDateTime(appointment.dateTime)}</span>
            </div>

            <div>
              <div className="font-bold">Property</div>
              <Link href={`/properties/${appointment.listingId}`}>
                <span className="text-blue-600 hover:underline">
                  {appointment.listing.title}
                </span>
              </Link>
            </div>

            <div>
              <div className="font-bold">Message</div>
              <span>{appointment.message}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 justify-end">
          {appointment.status === "pending" && (
            <>
              <Button onClick={handleAccept}>Accept</Button>
              <Button variant="destructive" onClick={handleDecline}>
                Decline
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
