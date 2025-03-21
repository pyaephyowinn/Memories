"use client";

import Link from "next/link";
import { User, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerRegistrationForm } from "./components/CustomerRegistrationForm";
import { OwnerRegistrationForm } from "./components/OwnerRegistrationForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto w-[90%] md:w-full py-8 flex flex-col items-center justify-center">
      <div className="mx-auto flex flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">
              <User className="h-4 w-4 mr-2" />
              Customer
            </TabsTrigger>
            <TabsTrigger value="owner">
              <Building className="h-4 w-4 mr-2" />
              Property Owner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <CustomerRegistrationForm />
          </TabsContent>

          <TabsContent value="owner">
            <OwnerRegistrationForm />
          </TabsContent>
        </Tabs>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
