import { usePropertyContext } from '@/api/context/property_list_context'
import { ErrorState } from '@/components/ErrorState'
import { LoadingState } from '@/components/LoadingState'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PROPERTY_TYPES } from '@/utils/constants'
import { HousePlus } from 'lucide-react'
import type { AllPropertyTypes, PropertyOnPage } from '@/types'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { properties, error, isLoading, nextPage, prevPage } =
    usePropertyContext()

  if (isLoading) {
    return <LoadingState message="Wait while we are fetching properties" />
  }
  if (error || !properties) {
    return <ErrorState message="Failed to load properties" />
  }

  return (
    <div className="p-4 relative font-Teachers flex flex-col w-full h-full ">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 overflow-y-auto">
        {properties.data.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </div>

      <div className="absolute bottom-0 bg-gray-100 left-0 w-full p-2 flex justify-end items-center gap-2">
        <button
          className="flex items-center gap-2 font-medium bg-gray-800 hover:bg-gray-700 transition-all text-gray-300 min-w-fit px-4 py-3 rounded-sm shadow-sm"
          onClick={() => {
            if (properties.prev) prevPage()
          }}
        >
          Previous Page
        </button>
        Page {properties.next ? properties.next - 1 : properties.prev + 1} of{' '}
        {properties.last}
        <button
          className="flex items-center gap-2 font-medium bg-gray-800 hover:bg-gray-700 transition-all text-gray-300 min-w-fit px-4 py-3 rounded-sm shadow-sm"
          onClick={() => {
            if (properties.next) nextPage()
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  )
}

function Property({ property }: { property: PropertyOnPage }) {
  return (
    <div className="bg-gray-300 rounded-2xl p-5 shadow-md flex flex-col justify-between min-h-[220px]">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl font-semibold">
          {property.property_name}, {property.city}
        </h2>

        <p>{property.address}</p>

        <div className="bg-gray-700 text-white w-fit px-3 py-1 text-sm rounded-md">
          {property.property_type.toUpperCase()}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-lg font-semibold">
          ₹ {property.price.toLocaleString()}
        </div>

        <Link
          to={`/properties/$id`}
          params={{ id: property.id }}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          See Details
        </Link>
      </div>
    </div>
  )
}

function Header() {
  const { propertyType, setPropertyType } = usePropertyContext()
  const handleFilter = (value: AllPropertyTypes) => {
    value === 'all' ? setPropertyType(undefined) : setPropertyType(value)
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">All Properties</h2>
      <div className="flex items-center min-w-fit gap-2">
        <Select
          onValueChange={(value: AllPropertyTypes) => handleFilter(value)}
          defaultValue={propertyType ?? "all"}
        >
          <SelectTrigger className="w-full px-4 py-6 bg-gray-300 font-medium focus:ring-0 focus-within:ring-0 focus-visible:ring-0">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 gap-1 text-gray-300">
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type} value={type} className="font-Teachers">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Link
          to="/properties/add-property"
          className="flex items-center gap-2 font-medium bg-gray-800 hover:bg-gray-700 transition-all text-gray-300 min-w-fit px-4 py-3 rounded-sm shadow-sm"
        >
          <HousePlus /> Add Property
        </Link>
      </div>
    </div>
  )
}
