import { getPropertyById } from "@/services/property";
import { PropertyDetailPage } from "../components/PropertyDetailPage";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(+id);

  if (!property) {
    return <div>Property not found</div>;
  }

  return <PropertyDetailPage property={property} />;
}
