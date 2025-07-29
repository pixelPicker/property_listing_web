import { ErrorState } from '@/components/ErrorState'
import { LoadingState } from '@/components/LoadingState'
import { type PropertyOnPage } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/properties/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<PropertyOnPage | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/real-estate-data?id=${id}`,
        )
        if (!res.ok) {
          throw new Error('Failed to fetch data. Please try again')
        }
        const data = await res.json()
        setData(data[0])
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (isLoading) {
    return <LoadingState message="Wait while we are fetching properties" />
  }
  if (error || !data) {
    return <ErrorState message="Failed to load properties" />
  }
  return <PropertyDetail property={data} />
}

export default function PropertyDetail({
  property,
}: {
  property: PropertyOnPage
}) {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="mx-auto px-6 py-8">
        <div className="bg-gray-300 dark:bg-gray-700 rounded-xl shadow-lg p-4">
          <h1 className="text-3xl font-bold mb-2">
            {property.property_name}
          </h1>
          <p className="text-lg mb-4">
            {property.address}, {property.city} {property.postal_code}
          </p>

          <div className="flex items-center gap-4">
            <span className="inline-block bg-gray-800 text-white px-4 py-1 rounded-full text-base">
              {property.property_type.toUpperCase()}
            </span>
            <span className="text-xl font-semibold">
              ₹ {property.price.toLocaleString()}
            </span>
            <span>
              Listed on: {new Date(property.listing_date).toLocaleDateString()}
            </span>
          </div>
          
          <hr className='w-full h-[1px] bg-gray-100 mt-6 mb-4' />

          <div >
            <h2 className="text-2xl font-semibold mb-2">
              Description
            </h2>
            <p className="text-lg leading-relaxed max-w-[50ch]">
              {property.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
