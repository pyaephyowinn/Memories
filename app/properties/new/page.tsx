"use client";

import { PropertyType } from "@/lib/schemas";
import { PropertyForm } from "../components/PropertyForm";
import { createProperty } from "@/services/property";
import { useToast } from "@/hooks/use-toast";

export default function NewPropertyPage() {
  const { toast } = useToast();

  const handleSubmit = async (data: PropertyType) => {
    try {
      const createdProperty = await createProperty(data);
      toast({
        title: "Success",
        description: "Property created successfully",
      });
    } catch (err) {
      console.log("err", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
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
            currency: "MMK",
          }}
        />
      </div>
    </main>
  );
}
