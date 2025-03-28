import { RefreshCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function SearchFilters() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Location</h3>
        <div className="flex space-x-2">
          <Input placeholder="City, ZIP or Neighborhood" />
          <Button size="icon" variant="outline">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Input
              type="number"
              placeholder="Min"
              className="w-[45%]"
              defaultValue={200000}
            />
            <span className="flex items-center">-</span>
            <Input
              type="number"
              placeholder="Max"
              className="w-[45%]"
              defaultValue={600000}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Property Type</h3>
        <div className="grid gap-2">
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox id="type-house" /> House
          </Label>
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox id="type-apartment" /> Apartment
          </Label>
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox id="type-condo" /> Condo
          </Label>
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox id="type-townhouse" /> Townhouse
          </Label>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Bedrooms</h3>
        <RadioGroup defaultValue="any">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="bed-any" />
              <Label htmlFor="bed-any">Any</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="bed-1" />
              <Label htmlFor="bed-1">1+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="bed-2" />
              <Label htmlFor="bed-2">2+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="bed-3" />
              <Label htmlFor="bed-3">3+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="bed-4" />
              <Label htmlFor="bed-4">4+</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-2">Bathrooms</h3>
        <RadioGroup defaultValue="any">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="bath-any" />
              <Label htmlFor="bath-any">Any</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="bath-1" />
              <Label htmlFor="bath-1">1+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="bath-2" />
              <Label htmlFor="bath-2">2+</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="bath-3" />
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
              defaultValue={800}
            />
            <span className="flex items-center">-</span>
            <Input
              type="number"
              placeholder="Max"
              className="w-[45%]"
              defaultValue={2500}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Amenities</h3>
        <div className="grid gap-2">
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox id="amenity-pool" /> Pool
          </Label>
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox id="amenity-garage" /> Garage
          </Label>
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox id="amenity-ac" /> Air Conditioning
          </Label>
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox id="amenity-gym" /> Gym
          </Label>
          <Label className="flex items-center gap-2 font-normal">
            <Checkbox id="amenity-fireplace" /> Fireplace
          </Label>
        </div>
      </div>

      <div className="pt-4 flex gap-2">
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" size="icon">
          <RefreshCcw className="h-4 w-4" />
          <span className="sr-only">Reset filters</span>
        </Button>
      </div>
    </div>
  );
}
