import { getPropertyById } from "@/services/property";
import { EditPropertyPage } from "../../components/EditPropertyPage";
import { PropertyDetailType } from "@/lib/schemas";

export default async function EditProperty({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params.id) || "";
  const property = (await getPropertyById(+id)) as PropertyDetailType;

  return <EditPropertyPage property={property} />;
}
