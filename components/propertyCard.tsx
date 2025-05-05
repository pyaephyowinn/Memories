"use client";

import { Bed, Bath, Move, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";

export default function PropertyCard({
  id,
  images,
  title,
  price,
  bedrooms,
  bathrooms,
  size,
  status,
  listingType,
  city,
  currency,
}: Prisma.ListingGetPayload<{}>) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 relative">
        <Link href={`/properties/${id}`}>
          <Image
            src={images?.[0] || "/placeholder.svg"}
            alt={title}
            width={600}
            height={400}
            className="object-cover w-full h-48 transition-transform hover:scale-105"
          />
        </Link>
        <Badge
          className="absolute top-2 right-2 capitalize"
          variant={
            status === "available"
              ? "default"
              : status === "sold"
              ? "destructive"
              : "secondary"
          }
        >
          {status}
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{city}</span>
        </div>
        <Link href={`/properties/${id}`}>
          <CardTitle className="text-base md:text-lg md:mb-2 hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </Link>
        <p className="text-xl md:text-2xl font-bold text-primary">
          {price?.toLocaleString()} {currency || "MMK"}
        </p>

        <p className="text-sm text-muted-foreground">
          {listingType === "rent" ? "Monthly rent" : "Sale"}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between text-sm text-muted-foreground w-full">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {bedrooms} beds
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {bathrooms} baths
          </div>
          <div className="flex items-center">
            <Move className="w-4 h-4 mr-1" />
            {size} sqft
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <Button asChild variant="outline" size="sm" className="md:flex-1">
            <Link href={`/properties/${id}`}>View Details</Link>
          </Button>
          <Button asChild size="sm" className="md:flex-1">
            <Link href={`/appointments/schedule/${id}`}>
              <Calendar className="w-4 h-4 mr-1" />
              Schedule
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
