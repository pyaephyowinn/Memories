import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyFilterSchema, PropertyFilterType } from "@/lib/schemas";
import {
  propertyFeatures,
  propertyTypes as propertyTypesConst,
} from "@/lib/constants";

export function SearchFilters() {
  const [values, setValues] = useQueryStates(
    {
      title: parseAsString.withDefault(""),
      location: parseAsString.withDefault(""),
      minBeds: parseAsInteger.withDefault(0),
      minBath: parseAsInteger.withDefault(0),
      minPrice: parseAsInteger.withDefault(0),
      maxPrice: parseAsInteger.withDefault(0),
      minSize: parseAsInteger.withDefault(0),
      maxSize: parseAsInteger.withDefault(0),
      listingType: parseAsString.withDefault(""),
      propertyTypes: parseAsArrayOf(parseAsString).withDefault([]),
      features: parseAsArrayOf(parseAsString).withDefault([]),
    },
    {
      shallow: false,
    }
  );

  const { register, handleSubmit, reset, control } =
    useForm<PropertyFilterType>({
      defaultValues: values,
      resolver: zodResolver(propertyFilterSchema),
    });

  const onSubmit = (data: PropertyFilterType) => {
    setValues(data);
  };

  const handleReset = () => {
    reset();
    setValues({
      title: "",
      location: "",
      minBeds: 0,
      minBath: 0,
      minPrice: 0,
      maxPrice: 0,
      minSize: 0,
      maxSize: 0,
      listingType: "",
      propertyTypes: [],
      features: [],
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="font-medium mb-2">Location</h3>
        <Input
          placeholder="City, ZIP or Neighborhood"
          {...register("location")}
        />
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Input
              type="number"
              placeholder="Min"
              className="w-[45%]"
              {...register("minPrice")}
            />
            <span className="flex items-center">-</span>
            <Input
              type="number"
              placeholder="Max"
              className="w-[45%]"
              {...register("maxPrice")}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Property Type</h3>
        <div className="grid gap-2">
          {propertyTypesConst.map((type) => (
            <Controller
              key={type}
              control={control}
              name="propertyTypes"
              render={({ field }) => (
                <Label className="flex items-center gap-2 font-normal capitalize">
                  <Checkbox
                    id={type}
                    checked={field.value?.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...(field?.value || []), type]);
                      } else {
                        field.onChange(
                          field.value?.filter((value) => value !== type)
                        );
                      }
                    }}
                  />
                  {type}
                </Label>
              )}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Bedrooms</h3>
        <RadioGroup
          defaultValue={0}
          {...register("minBeds", { valueAsNumber: true })}
        >
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={0} id="bed-any" />
              <Label htmlFor="bed-any">Any</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={1} id="bed-1" />
              <Label htmlFor="bed-1">1+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={2} id="bed-2" />
              <Label htmlFor="bed-2">2+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={3} id="bed-3" />
              <Label htmlFor="bed-3">3+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={4} id="bed-4" />
              <Label htmlFor="bed-4">4+</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-2">Bathrooms</h3>
        <RadioGroup
          defaultValue={0}
          {...register("minBath", { valueAsNumber: true })}
        >
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={0} id="bath-any" />
              <Label htmlFor="bath-any">Any</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={1} id="bath-1" />
              <Label htmlFor="bath-1">1+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={2} id="bath-2" />
              <Label htmlFor="bath-2">2+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={3} id="bath-3" />
              <Label htmlFor="bath-3">3+</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-2">Square Footage</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Input
              type="number"
              placeholder="Min"
              className="w-[45%]"
              {...register("minSize")}
            />
            <span className="flex items-center">-</span>
            <Input
              type="number"
              placeholder="Max"
              className="w-[45%]"
              {...register("maxSize")}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Amenities</h3>
        <div className="grid gap-2">
          {propertyFeatures.map((feature) => (
            <Controller
              key={feature}
              control={control}
              name="features"
              render={({ field }) => (
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    id={feature}
                    checked={field.value?.includes(feature)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...(field?.value || []), feature]);
                      } else {
                        field.onChange(
                          field.value?.filter((value) => value !== feature)
                        );
                      }
                    }}
                  />
                  {feature}
                </Label>
              )}
            />
          ))}
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-2">
        <Button className="w-full" type="submit">
          Apply Filters
        </Button>

        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={handleReset}
        >
          Clear Filters
        </Button>
      </div>
    </form>
  );
}
