import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { Bath, Bed, Calendar, MapPin, Move } from "lucide-react";
import Link from "next/link";

type PropertyListCardProps = {
  property: Prisma.ListingGetPayload<{}>;
};

export function PropertyListCard({ property }: PropertyListCardProps) {
  return (
    <Card className="overflow-hidden h-64">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="sm:w-1/3">
          <img
            src={property.images?.[0] || "/placeholder.svg"}
            alt={property.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="p-4 sm:w-2/3">
          <div className="flex flex-col h-full">
            <div>
              <div className="flex text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.city}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
              <div className="mb-2">
                <p className="text-2xl font-bold text-primary">
                  {property.price.toLocaleString()} {property.currency}
                </p>

                <p className="text-sm text-muted-foreground">
                  {property.listingType === "rent" ? "Monthly rent" : "Sale "}
                </p>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {property.description}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between text-sm text-muted-foreground mt-auto gap-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {property.bedrooms} beds
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                {property.bathrooms} baths
              </div>
              <div className="flex items-center">
                <Move className="w-4 h-4 mr-1" />
                {property.size} sqft
              </div>

              <div className="ml-auto flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/properties/${property.id}`}>View Details</Link>
                </Button>

                <Button asChild size="sm">
                  <Link href={`/appointments/schedule/${property.id}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
