"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { getMe, updateUser } from "@/services/user";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function ProfileTab() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState({ username: "", phone: "" });
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    let mounted = true;
    getMe().then((user) => {
      if (user && mounted) {
        setInitialData({
          username: user.username || "",
          phone: user.phone || "",
        });
        form.reset({
          username: user.username || "",
          phone: user.phone || "",
        });
      }
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data: { username: string; phone: string }) => {
    startTransition(async () => {
      try {
        await updateUser(data);
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Could not update profile. Please try again.",
        });
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Profile Management</CardTitle>
        <CardDescription className="text-center">
          Update your username and phone number.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <div className="max-w-md mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </div>
      </Form>
    </Card>
  );
}
