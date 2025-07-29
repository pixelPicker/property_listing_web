import { FormLabel } from '@/components/FormLabel'
import { API_BASE_URL, type PROPERTY_TYPES } from '@/utils/constants'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { usePropertyContext } from '@/api/context/property_list_context'

export const Route = createFileRoute('/properties/add-property')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AddPropertyForm />
}

type PropertyTypeUnion = Exclude<(typeof PROPERTY_TYPES)[number], 'all'>
export default function AddPropertyForm() {
  const [propertyType, setPropertyType] = useState<PropertyTypeUnion>('condo')
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const { refetch } = usePropertyContext()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const newProperty = {
      property_name: formData.get('property_name') as string,
      property_type: propertyType,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      postal_code: formData.get('postal_code') as string,
      price: Number(formData.get('price')),
      description: formData.get('description') as string,
      listing_date: formData.get('listing_date') as string,
    }

    try {
      const res = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProperty),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error)
      }
      await refetch()
      navigate({ to: '/' })
    } catch (error) {
      const err = error as Error
      setSubmissionError(err.message)
    }
  }

  return (
    <div className="w-full h-full grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-100 p-6 rounded-xl space-y-4"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">
          Create New Property
        </h2>

        <div>
          <FormLabel htmlFor="property_name">Property Name*</FormLabel>
          <input
            type="text"
            name="property_name"
            id="property_name"
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="eg. Lakeview Apartment"
          />
        </div>

        <div>
          <FormLabel htmlFor="address">Address*</FormLabel>
          <input
            type="text"
            name="address"
            id="address"
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="eg. 1234 Elm Street"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="city">City*</FormLabel>
            <input
              type="text"
              name="city"
              id="city"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <FormLabel htmlFor="postal_code">Postal Code*</FormLabel>
            <input
              type="number"
              name="postal_code"
              id="postal_code"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="price">Price (₹)*</FormLabel>
            <input
              type="number"
              name="price"
              id="price"
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="eg. 12000000"
            />
          </div>

          <div>
            <FormLabel htmlFor="listing_date">Listing Date*</FormLabel>
            <input
              type="date"
              name="listing_date"
              id="listing_date"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <FormLabel htmlFor="property_type">Property Type*</FormLabel>
          <Select
            required
            onValueChange={(value: PropertyTypeUnion) => setPropertyType(value)}
            value={propertyType}
            defaultValue={propertyType}
          >
            <SelectTrigger className="w-full px-3 py-2 border rounded-md">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent className="text-gray-800 bg-white rounded-lg shadow-md border border-gray-200">
              <SelectItem
                className="cursor-pointer font-Aeonik-Regular px-4 py-2 hover:bg-gray-100 transition-all duration-150 focus:bg-gray-100 focus:text-dark-what"
                value="condo"
              >
                Condo
              </SelectItem>
              <SelectItem
                className="cursor-pointer font-Aeonik-Regular px-4 py-2 hover:bg-gray-100 transition-all duration-150 focus:bg-gray-100 focus:text-dark-what"
                value="apartment"
              >
                Apartment
              </SelectItem>
              <SelectItem
                className="cursor-pointer font-Aeonik-Regular px-4 py-2 hover:bg-gray-100 transition-all duration-150 focus:bg-gray-100 focus:text-dark-what"
                value="house"
              >
                House
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <FormLabel htmlFor="description">Description*</FormLabel>
          <input
            type="text"
            name="description"
            id="description"
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Short summary about the property"
          />
        </div>

        {submissionError && (
          <p className="my-4 text-red-600 text-sm text-center max-w-[55ch]">
            {submissionError}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
          Create Property
        </button>
      </form>
    </div>
  )
}
