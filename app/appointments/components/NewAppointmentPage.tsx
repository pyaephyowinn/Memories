"use client";

import Link from "next/link";
import type React from "react";
import { useState } from "react";
import AppointmentForm from "@/app/appointments/components/AppointmentForm";
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
import { PropertyDetailType } from "@/lib/schemas";

type NewAppointmentPageProps = {
  currentUser: {
    username: string;
    email: string;
    phone: string;
  };
  property: PropertyDetailType;
};

export function NewAppointmentPage({
  currentUser,
  property,
}: NewAppointmentPageProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 container py-4 md:py-8">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/properties/1`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to property</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Schedule a Viewing
        </h1>
      </div>

      {!isSubmitted ? (
        <AppointmentForm
          username={currentUser.username}
          email={currentUser.email}
          phone={currentUser.phone}
          onSubmit={() => {}}
          defaultValues={{
            date: new Date(),
            message: "",
            time: "",
          }}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Appointment Requested</CardTitle>
            <CardDescription>
              Your appointment request has been submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-6 text-center">
              <Calendar className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Thank You!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We've received your appointment request. The property owner will
                review your request and confirm the appointment soon.
              </p>
            </div>
            <div className="text-sm">
              <p className="font-medium">What happens next?</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>The property owner will review your request</li>
                <li>You'll receive an email confirmation once approved</li>
                <li>
                  You can view and manage all your appointments in your
                  dashboard
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
