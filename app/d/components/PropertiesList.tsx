"use server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export async function PropertiesList() {
  return (
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
              <TableHead>Views</TableHead>
              <TableHead>Inquiries</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                id: "1",
                title: "Modern Apartment in Downtown",
                status: "available",
                price: "$350,000",
                views: 245,
                inquiries: 12,
              },
              {
                id: "2",
                title: "Spacious Family Home",
                status: "available",
                price: "$550,000",
                views: 189,
                inquiries: 8,
              },
              {
                id: "3",
                title: "Cozy Studio Near Park",
                status: "rented",
                price: "$1,500/month",
                views: 320,
                inquiries: 15,
              },
              {
                id: "4",
                title: "Luxury Penthouse with View",
                status: "sold",
                price: "$1,200,000",
                views: 270,
                inquiries: 10,
              },
            ].map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
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
                <TableCell>{property.price}</TableCell>
                <TableCell>{property.views}</TableCell>
                <TableCell>{property.inquiries}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/properties/${property.id}/edit`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm">
          <Link href="/properties">View All Properties</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
