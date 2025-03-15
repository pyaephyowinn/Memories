import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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

export function OwnerRegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Owner Registration</CardTitle>
        <CardDescription>
          Create an account to list and manage your properties
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name-owner">First name</Label>
            <Input id="first-name-owner" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name-owner">Last name</Label>
            <Input id="last-name-owner" placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email-owner">Email</Label>
          <Input
            id="email-owner"
            type="email"
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-owner">Phone Number</Label>
          <Input
            id="phone-owner"
            type="tel"
            placeholder="+1 (555) 000-0000"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name (Optional)</Label>
          <Input id="company" placeholder="Acme Real Estate" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password-owner">Password</Label>
          <div className="relative">
            <Input
              id="password-owner"
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
        <div className="space-y-2">
          <Label htmlFor="confirm-password-owner">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirm-password-owner"
              type={showConfirmPassword ? "text" : "password"}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showConfirmPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Account</Button>
      </CardFooter>
    </Card>
  );
}
