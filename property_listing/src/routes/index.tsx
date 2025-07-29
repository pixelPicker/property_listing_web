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
import { HousePlus, Search } from 'lucide-react'
import type { AllPropertyTypes, PropertyOnPage, PropertyPage } from '@/types'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { properties, error, isLoading } = usePropertyContext()
  const [searchQuery, setSearchQuery] = useState('')

  if (isLoading) {
    return <LoadingState message="Wait while we are fetching properties" />
  }
  if (error || !properties) {
    return <ErrorState message="Failed to load properties" />
  }

  return (
    <div className="p-4 relative font-Teachers flex flex-col w-full h-full ">
      <Header setSearchQuery={setSearchQuery} searchQuery={searchQuery} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 overflow-y-auto">
        {properties.data
          .filter(
            (property) =>
              property.property_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              property.city.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((property) => (
            <Property property={property} key={property.id} />
          ))}
      </div>

      <Footer properties={properties} />
    </div>
  )
}

function Property({ property }: { property: PropertyOnPage }) {
  return (
    <div className="bg-gray-300 dark:bg-gray-600 rounded-2xl p-5 shadow-md flex flex-col justify-between min-h-[220px]">
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
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition"
        >
          See Details
        </Link>
      </div>
    </div>
  )
}

function Header({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}) {
  const { propertyType, setPropertyType } = usePropertyContext()
  const handleFilter = (value: AllPropertyTypes) => {
    value === 'all' ? setPropertyType(undefined) : setPropertyType(value)
  }

  return (
    <div className="flex justify-between items-center mb-4 gap-2">
      <div className="bg-gray-400/10 px-4 rounded-sm border-[1.5px] border-gray-400/25 w-full flex items-center gap-2">
        <Search />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search "
          className="w-full px-2 py-3 placeholder:font-Teachers focus:outline-none outline-none focus-within:outline-none focus-visible:outline-none"
        />
      </div>
      <div className="flex items-center min-w-fit gap-2">
        <Select
          onValueChange={(value: AllPropertyTypes) => handleFilter(value)}
          defaultValue={propertyType ?? 'all'}
        >
          <SelectTrigger className="w-full px-4 py-6 bg-gray-300 dark:bg-gray-700 hover:bg-gray-500 font-medium focus:ring-0 focus-within:ring-0 focus-visible:ring-0">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-700 gap-1 text-gray-700 dark:text-gray-300">
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type} value={type} className="font-Teachers">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Link
          to="/properties/add-property"
          className="flex items-center gap-2 font-medium dark:bg-gray-700 bg-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500 transition-all text-gray-800 dark:text-gray-300 min-w-fit px-4 py-3 rounded-sm shadow-sm"
        >
          <HousePlus /> Add Property
        </Link>
      </div>
    </div>
  )
}

function Footer({ properties }: { properties: PropertyPage }) {
  const { nextPage, prevPage } = usePropertyContext()
  return (
    <div className="absolute bottom-0 bg-gray-100 dark:bg-gray-800 left-0 w-full p-2 flex justify-end items-center gap-2">
      <button
        className="flex items-center gap-2 font-medium dark:bg-gray-700 bg-gray-700 dark:hover:bg-gray-500 hover:bg-gray-500 transition-all text-gray-300 min-w-fit px-4 py-3 rounded-sm shadow-sm"
        onClick={() => {
          if (properties.prev) prevPage()
        }}
      >
        Previous Page
      </button>
      Page {properties.next ? properties.next - 1 : properties.prev + 1} of{' '}
      {properties.last}
      <button
        className="flex items-center gap-2 font-medium dark:bg-gray-700 bg-gray-700 dark:hover:bg-gray-500 hover:bg-gray-500 transition-all text-gray-300 min-w-fit px-4 py-3 rounded-sm shadow-sm"
        onClick={() => {
          if (properties.next) nextPage()
        }}
      >
        Next Page
      </button>
    </div>
  )
}
