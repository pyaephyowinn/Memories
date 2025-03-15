"use client"

import { useState } from "react"
import { ChevronDown, Home, Building, Warehouse, Store, DollarSign, MapPin, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export default function SearchFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])

  const togglePropertyType = (type: string) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== type))
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type])
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full bg-white rounded-md shadow-sm">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Advanced Filters
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="los-angeles">Los Angeles</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
                <SelectItem value="houston">Houston</SelectItem>
                <SelectItem value="miami">Miami</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Property status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div className="w-full">
              <Slider defaultValue={[0, 1000000]} max={2000000} step={50000} onValueChange={setPriceRange} />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Property Type</label>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Home, label: "House" },
              { icon: Building, label: "Apartment" },
              { icon: Warehouse, label: "Condo" },
              { icon: Store, label: "Commercial" },
            ].map(({ icon: Icon, label }) => (
              <Badge
                key={label}
                variant={selectedPropertyTypes.includes(label) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => togglePropertyType(label)}
              >
                <Icon className="h-3 w-3 mr-1" />
                {label}
                {selectedPropertyTypes.includes(label) && <Check className="h-3 w-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

