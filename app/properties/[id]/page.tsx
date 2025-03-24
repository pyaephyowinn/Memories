import { getPropertyById } from "@/services/property";
import { PropertyDetailPage } from "../components/PropertyDetailPage";

export default async function page({ params }: { params: { id: string } }) {
  const property = await getPropertyById(+params.id);

  if (!property) {
    return <div>Property not found</div>;
  }

  return <PropertyDetailPage property={property} />;
}
