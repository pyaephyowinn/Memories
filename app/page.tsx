import { Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/property-card";
import SearchFilters from "@/components/search-filters";
import { SVGProps } from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 z-50 bg-white">
        <Link className="flex items-center justify-center" href="/">
          <HomeIcon className="h-6 w-6" />
          <span className="ml-2 font-bold">Acme Real Estate</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/properties?status=available&type=buy"
          >
            Buy
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/properties?status=available&type=rent"
          >
            Rent
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/sell"
          >
            Sell
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            href="/login"
          >
            Login
          </Link>
          <Link href="/register">
            <Button size="sm">Register</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Find Your Dream Home
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Discover the perfect property for you. Whether you're looking
                  to buy, rent, or sell, we've got you covered.
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 Acme Real Estate. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
