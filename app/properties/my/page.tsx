import PropertyCard from "@/components/propertyCard";
import { getPropertiesByOwner } from "@/services/property";

export default async function PropertiesPage() {
  const properties = await getPropertiesByOwner();

  console.log("properties", properties);

  return (
    <div className="flex-1 container mx-auto flex flex-col gap-4 md:gap-8 py-4 md:py-8">
      <h1 className="text-3xl font-bold">Your Properties</h1>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {properties.map((property) => (
          <PropertyCard edit key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}
