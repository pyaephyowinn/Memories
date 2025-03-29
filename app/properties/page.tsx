import { searchProperties } from "@/services/property";
import { PropertySearchPage } from "./components/PropertySearchPage";

export default async function PropertySearch({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const search = await searchParams;
  const properties = await searchProperties({
    ...search,
    propertyTypes: search.propertyTypes?.split(","),
    features: search.features?.split(",") || [],
  });
  return <PropertySearchPage properties={properties} />;
}
