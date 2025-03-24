"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bed,
  Bath,
  Move,
  MapPin,
  Calendar,
  Share2,
  Heart,
  Phone,
  Mail,
  MessageSquare,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { PropertyDetailType } from "@/lib/schemas";

export function PropertyDetailPage({
  property,
}: {
  property: PropertyDetailType;
}) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  // Mock property data
  const property_ = {
    id: "params.id",
    title: "Modern Apartment in Downtown",
    price: "$350,000",
    description:
      "This beautiful modern apartment is located in the heart of downtown. It features an open floor plan with high ceilings, large windows that provide plenty of natural light, and premium finishes throughout. The kitchen is equipped with stainless steel appliances, quartz countertops, and custom cabinetry. The spacious living room opens to a private balcony with city views. The primary bedroom has a walk-in closet and an en-suite bathroom with a double vanity and a walk-in shower. The second bedroom is perfect for guests or a home office. Additional features include in-unit laundry, central air conditioning, and one assigned parking space in the secure garage.",
    location: "123 Main St, Downtown, New York, NY 10001",
    beds: 2,
    baths: 2,
    sqft: 1200,
    status: "available",
    type: "buy",
    yearBuilt: 2018,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    features: [
      "Central Air Conditioning",
      "In-unit Laundry",
      "Balcony",
      "Stainless Steel Appliances",
      "Quartz Countertops",
      "Hardwood Floors",
      "Walk-in Closet",
      "High Ceilings",
      "Elevator Building",
      "Secure Parking",
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah.johnson@acmerealestate.com",
      image: "/placeholder.svg?height=200&width=200",
    },
  };

  return (
    <div className="container mx-auto flex flex-col gap-4 md:gap-8 py-4 md:py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to previous page</span>
            </Button>

            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {property_.location}
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-2">
            {property.title}
          </h1>
          <p className="text-2xl font-bold text-primary mt-1">
            {property.price}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setLiked(!liked)}>
            <Heart
              className={`h-4 w-4 mr-2 ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {liked ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button asChild size="sm">
            <Link href={`/appointments/schedule/${property_.id}`}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Viewing
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${property_.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Bed className="h-5 w-5 mr-1" />
              {property.bedrooms} beds
            </div>
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-1" />
              {property.bathrooms} baths
            </div>
            <div className="flex items-center">
              <Move className="h-5 w-5 mr-1" />
              {property.size} sqft
            </div>
            <div className="flex items-center">
              <Badge
                className="capitalize"
                variant={
                  property.status === "available" ? "default" : "secondary"
                }
              >
                {property.status}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="mt-2 text-muted-foreground">
                  {property.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Property Type
                  </h4>
                  <p className="capitalize">{property.propertyType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Year Built
                  </h4>
                  <p>{property.yearBuilt}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Status
                  </h4>
                  <div className="capitalize">{property.status}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Listing Type
                  </h4>
                  <p>
                    {property.listingType === "rent" ? "For Rent" : "For Sale"}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <h3 className="text-lg font-semibold">Features & Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <h3 className="text-lg font-semibold">Location</h3>

              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Street:
                  </h4>
                  <p className="font-semibold">{property.streetAddress}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    City:
                  </h4>
                  <p className="font-semibold">{property.city}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    State:
                  </h4>
                  <p className="font-semibold">{property.state}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Agent</CardTitle>
              <CardDescription>
                Get in touch with the listing agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={property_.agent.image}
                    alt={property_.agent.name}
                  />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{property_.agent.name}</p>
                  <p className="text-sm text-muted-foreground">Listing Agent</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  {property_.agent.phone}
                </Button>
                <Button variant="outline" className="justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  {property_.agent.email}
                </Button>
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Type your message here..."
                  className="min-h-[100px]"
                />
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule a Viewing</CardTitle>
              <CardDescription>
                Book an appointment to see this property_
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4 text-center">
                <Calendar className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-sm">
                  Available for viewings daily from 9 AM to 5 PM
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href={`/appointments/schedule/${property_.id}`}>
                  Schedule Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex gap-4">
                  <div className="relative h-16 w-16 flex-none rounded-md overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Similar property_"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium">
                      Luxury Condo with View
                    </h4>
                    <p className="text-sm text-primary font-medium">$380,000</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Bed className="h-3 w-3 mr-1" />2 beds
                      <Bath className="h-3 w-3 mx-1" />2 baths
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/properties">View More</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
