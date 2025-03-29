"use client";

import { useState } from "react";
import {
  Bath,
  Bed,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid,
  List,
  Move,
} from "lucide-react";
import PropertyCard from "@/components/propertyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchFilters } from "./SearchFilters";
import { Prisma } from "@prisma/client";
import { PropertyListCard } from "@/components/propertyListCard";

type PropertySearchPageProps = {
  properties: Prisma.ListingGetPayload<{}>[];
};

export function PropertySearchPage({ properties }: PropertySearchPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="container py-6 flex flex-col md:flex-row gap-6">
      {/* Mobile Filter Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden mb-4">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <SearchFilters />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filters */}
      <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <SearchFilters />
          </CardContent>
        </Card>
      </div>

      {/* Search Results */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Property Search</h1>
              <p className="text-muted-foreground">
                Showing 1-12 of 48 results
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none rounded-l-md"
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-none rounded-r-md"
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {properties.map((property) => (
                <PropertyListCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8">
                2
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8">
                3
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8">
                4
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8">
                5
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
