import { getPropertiesByOwner } from "@/services/property";

export default async function PropertiesPage() {
  const properties = await getPropertiesByOwner();

  console.log("properties", properties);
  return <div>PropertiesPage</div>;
}
