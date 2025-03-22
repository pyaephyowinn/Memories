import { getPropertyById } from "@/services/property";
import { EditPropertyPageContent } from "../../components/EditPropertyPageContent";
import { PropertyDetailType } from "@/lib/schemas";

export default async function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params.id) || "";
  const property = (await getPropertyById(+id)) as PropertyDetailType;

  return <EditPropertyPageContent property={property} />;
}
