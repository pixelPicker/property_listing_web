import {type PropertyTypes, type PropertyPage } from '@/types'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { useProperty } from '../queries/useProperty'

type ContextPropertyProps = {
  properties?: PropertyPage
  isLoading: boolean
  error: Error | null
  nextPage: () => void
  prevPage: () => void
  refetch: () => Promise<void>
  propertyType: PropertyTypes | undefined
  setPropertyType: React.Dispatch<React.SetStateAction<PropertyTypes | undefined>>
}

const PropertyContext = createContext<ContextPropertyProps | undefined>(
  undefined,
)

export default function PropertyProvider({
  children,
}: {
  children: ReactNode
}) {
  const [page, setPage] = useState(1)
  const [propertyType, setPropertyType ] = useState<PropertyTypes | undefined>();

  const { data, error, isLoading, refetch } = useProperty({ page, propertyType })
  const nextPage = () => setPage((p) => p + 1)
  const prevPage = () => setPage((p) => Math.max(1, p - 1))

  return (
    <PropertyContext.Provider
      value={{
        properties: data,
        error,
        isLoading,
        nextPage,
        prevPage,
        refetch,
        propertyType,
        setPropertyType
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export const usePropertyContext = () => {
  const ctx = useContext(PropertyContext)
  if (!ctx) {
    throw new Error('usePropertyContext must be used within PropertyProvider')
  }
  return ctx
}
