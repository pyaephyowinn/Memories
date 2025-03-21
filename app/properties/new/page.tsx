"use client";

import { PropertyType } from "@/lib/schemas";
import { PropertyForm } from "../components/PropertyForm";
import { createProperty } from "@/services/property";

export default function NewPropertyPage() {
  const handleSubmit = async (data: PropertyType) => {
    await createProperty(data);
  };

  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Add New Property
          </h1>
          <p className="text-muted-foreground">
            Fill in the details to list a new property
          </p>
        </div>

        <PropertyForm
          onSubmit={handleSubmit}
          defaultValues={{
            title: "",
            description: "",
            streetAddress: "",
            city: "",
            state: "",
            price: 0,
            zipCode: "",
            propertyType: "",
            listingType: "",
            size: 0,
            bedrooms: 0,
            bathrooms: 0,
            yearBuilt: 0,
            status: "",
            images: [],
          }}
        />
      </div>
    </main>
  );
}
