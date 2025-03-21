import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/property-card";
import SearchFilters from "@/components/search-filters";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Find Your Dream Home
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Discover the perfect property for you. Whether you're looking to
                buy, rent, or sell, we've got you covered.
              </p>
            </div>
            <div className="w-full max-w-3xl space-y-2">
              <form className="flex flex-col space-y-4">
                <div className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter a city, neighborhood, or ZIP code"
                    type="text"
                  />
                  <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
                <SearchFilters />
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            Featured Listings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <PropertyCard
              id="1"
              imageUrl="/placeholder.svg?height=400&width=600"
              title="Modern Apartment in Downtown"
              price="$350,000"
              beds={2}
              baths={2}
              sqft={1200}
              status="available"
              type="buy"
              location="Downtown, New York"
            />
            <PropertyCard
              id="2"
              imageUrl="/placeholder.svg?height=400&width=600"
              title="Spacious Family Home"
              price="$550,000"
              beds={4}
              baths={3}
              sqft={2500}
              status="available"
              type="buy"
              location="Suburbs, Chicago"
            />
            <PropertyCard
              id="3"
              imageUrl="/placeholder.svg?height=400&width=600"
              title="Cozy Studio Near Park"
              price="$1,500/month"
              beds={1}
              baths={1}
              sqft={600}
              status="available"
              type="rent"
              location="Central Park, New York"
            />
            <PropertyCard
              id="4"
              imageUrl="/placeholder.svg?height=400&width=600"
              title="Luxury Penthouse with View"
              price="$1,200,000"
              beds={3}
              baths={3}
              sqft={3000}
              status="available"
              type="buy"
              location="Marina District, San Francisco"
            />
          </div>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
