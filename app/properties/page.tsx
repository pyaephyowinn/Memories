import PropertyCard from "@/components/property-card";
import { getPropertiesByOwner } from "@/services/property";

export default async function PropertiesPage() {
  const properties = await getPropertiesByOwner();

  return (
    <div className="container mx-auto flex flex-col gap-4 md:gap-8 py-4 md:py-8">
      <h1 className="text-3xl font-bold">Your Properties</h1>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}
