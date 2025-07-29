import type { PropertyPage, PropertyTypes } from '@/types'
import { API_BASE_URL } from '@/utils/constants'
import { useEffect, useState } from 'react'

export function useProperty({
  page,
  propertyType,
}: {
  page?: number
  propertyType?: PropertyTypes
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<PropertyPage>()

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}?_page=${page ?? 1}&_per_page=6${propertyType ? `&property_type=${propertyType}` : ''}`,
      )
      if (!res.ok) {
        throw new Error('Failed to fetch data. Please try again later')
      }
      const data = await res.json()
      setData(data)
    } catch (error) {
      const err = error as Error
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [page, propertyType])

  return { isLoading, error, data, refetch: fetchData }
}
