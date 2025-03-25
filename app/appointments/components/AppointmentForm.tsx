"use client";

import type React from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { appointmentSchema, AppointmentType } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateDateOnly, updateHour } from "@/lib/date";
import { getHours } from "date-fns";
import { useRouter } from "next/navigation";

type AppointmentFormProps = {
  username: string;
  email: string;
  phone: string;
  onSubmit: (data: Omit<AppointmentType, "hour">) => void;
  defaultValues: AppointmentType;
};

export default function AppointmentForm({
  defaultValues,
  onSubmit,
  username,
  email,
  phone,
}: AppointmentFormProps) {
  const router = useRouter();
  const form = useForm<AppointmentType>({
    resolver: zodResolver(appointmentSchema),
    defaultValues,
  });

  const date = form.watch("date");

  const handleSubmit = (data: AppointmentType) => {
    const updatedDate = updateHour(data.date, data.hour);
    onSubmit({
      date: updatedDate,
      message: data.message,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Schedule a time to view this property
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" disabled value={username} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" disabled value={email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" disabled value={phone} />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? date.toDateString() : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          initialFocus
                          selected={field.value}
                          onSelect={(date) => {
                            console.log("triggered");
                            const updatedDate = new Date(updateDateOnly(date)!);
                            field.onChange(updatedDate);
                          }}
                          disabled={(date) => {
                            // Disable past dates and Sundays
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today || date.getDay() === 0;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Select
                        value={field.value.toString()}
                        onValueChange={(val) => {
                          field.onChange(parseInt(val));
                        }}
                      >
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"9"}>9:00 AM</SelectItem>
                          <SelectItem value={"10"}>10:00 AM</SelectItem>
                          <SelectItem value={"11"}>11:00 AM</SelectItem>
                          <SelectItem value={"12"}>12:00 PM</SelectItem>
                          <SelectItem value={"13"}>1:00 PM</SelectItem>
                          <SelectItem value={"14"}>2:00 PM</SelectItem>
                          <SelectItem value={"15"}>3:00 PM</SelectItem>
                          <SelectItem value={"16"}>4:00 PM</SelectItem>
                          <SelectItem value={"17"}>5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      id="message"
                      placeholder="Any specific questions or requirements for the viewing?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Request Appointment</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
