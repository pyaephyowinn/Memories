import { searchProperties } from "@/services/property";
import { PropertySearchPage } from "./components/PropertySearchPage";

export default async function PropertySearch({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const search = await searchParams;
  const { properties, totalCount } = await searchProperties({
    ...search,
    propertyTypes: search.propertyTypes?.split(","),
    features: search.features?.split(",") || [],
    minBeds: search.minBeds ? parseInt(search.minBeds) : undefined,
    minBath: search.minBath ? parseInt(search.minBath) : undefined,
    order: search.order,
  });

  return <PropertySearchPage properties={properties} totalCount={totalCount} />;
}
