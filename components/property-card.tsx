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
import { PropertyDetailType } from "@/lib/schemas";

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
  streetAddress,
  currency,
}: PropertyDetailType) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 relative">
        <Link href={`/properties/${id}`}>
          <Image
            src={images[0] || "/placeholder.svg"}
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
          <div className="flex flex-col">
            <span className="text-xs">{streetAddress}</span>
            <span>{city}</span>
          </div>
        </div>
        <Link href={`/properties/${id}`}>
          <CardTitle className="text-lg mb-2 hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </Link>
        <p className="text-2xl font-bold text-primary">
          {price} {currency || "MMK"}
        </p>
        {listingType === "rent" && (
          <p className="text-sm text-muted-foreground">Monthly rent</p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-4">
        <div className="flex justify-between text-sm text-muted-foreground w-full">
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
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/properties/${id}`}>View Details</Link>
          </Button>
          <Button asChild size="sm" className="flex-1">
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
