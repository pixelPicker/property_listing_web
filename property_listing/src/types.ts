import type { PROPERTY_TYPES } from './utils/constants'

export interface PropertyPage {
  first: number
  prev: number
  next: any
  last: number
  pages: number
  items: number
  data: PropertyOnPage[]
}

export interface PropertyOnPage {
  property_id: number
  property_type: 'condo' | 'apartment' | 'house'
  address: string
  city: string
  postal_code: string
  price: number
  description: string
  listing_date: string
  property_name: string
  id: string
}

export type AllPropertyTypes = (typeof PROPERTY_TYPES)[number]
export type PropertyTypes = Exclude<(typeof PROPERTY_TYPES)[number], 'all'>
