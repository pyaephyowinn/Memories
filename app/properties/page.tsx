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
    // title: "",
    // city: "",
    // priceRange: {
    //   min: 0,
    //   max: 99999,
    // },
    // minBeds: 0,
    // minBath: 0,
    // propertyType: [],
    // listingType: "",
  });
  console.log("properties", properties);
  return <PropertySearchPage properties={properties} />;
}
