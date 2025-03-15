"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, KeyRound, Smartphone } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>

        {!showTwoFactor ? (
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your email and password to sign in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" onClick={() => setShowTwoFactor(true)}>
                Sign In
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Enter the verification code sent to your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="app" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="app">
                    <KeyRound className="h-4 w-4 mr-2" />
                    Authenticator
                  </TabsTrigger>
                  <TabsTrigger value="sms">
                    <Smartphone className="h-4 w-4 mr-2" />
                    SMS
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="app" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="auth-code">Authentication Code</Label>
                    <Input
                      id="auth-code"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Open your authenticator app and enter the 6-digit code for
                    Acme Real Estate.
                  </p>
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sms-code">SMS Code</Label>
                    <Input
                      id="sms-code"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We've sent a verification code to your registered phone
                    number. It will expire in 10 minutes.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full">Verify</Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowTwoFactor(false)}
              >
                Back to Login
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
