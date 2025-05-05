"use client";

import { PropertyDetailType, PropertyType } from "@/lib/schemas";
import { PropertyForm } from "./PropertyForm";
import { updateProperty } from "@/services/property";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function EditPropertyPage({
  property,
}: {
  property?: PropertyDetailType;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: PropertyType) => {
    try {
      await updateProperty(property?.id || 0, data);

      router.back();
      toast({
        title: "Success",
        description: "Property updated successfully.",
      });
    } catch (err) {
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
          <h1 className="text-3xl font-bold tracking-tight">Edit Property</h1>
          <p className="text-muted-foreground">
            Fill in the details to edit property
          </p>
        </div>

        <PropertyForm
          onSubmit={handleSubmit}
          defaultValues={{
            title: property?.title || "",
            description: property?.description || "",
            streetAddress: property?.streetAddress || "",
            city: property?.city || "",
            state: property?.state || "",
            price: property?.price || 0,
            zipCode: property?.zipCode || "",
            propertyType: property?.propertyType || "",
            listingType: property?.listingType || "",
            size: property?.size || 0,
            bedrooms: property?.bedrooms || 0,
            bathrooms: property?.bathrooms || 0,
            yearBuilt: property?.yearBuilt || 0,
            status: property?.status || "",
            images: property?.images || [],
            features: property?.features || [],
            currency: property?.currency || "MMK",
          }}
        />
      </div>
    </main>
  );
}
