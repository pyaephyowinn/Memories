import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/property-card";
import SearchFilters from "@/components/search-filters";
import { getTop4Properties } from "@/services/property";

export default async function Home() {
  const properties = await getTop4Properties();
  console.log("properties", properties);

  return (
    <div className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
        <div className="container mx-auto">
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
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            Featured Listings
          </h2>
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
