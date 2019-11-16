import { Leaderboard, User, UserPage } from '@/types'

import { toCamelCaseObject } from '@/models/camel-case'
import { endpoint } from '@/models/uri'
import { newPage } from '@/models/page'

export async function getCompanyCount (): Promise<number> {
  const response = await window.fetch(endpoint`/v1/companies`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { count } = await response.json()
  return count || 0
}

// getCompanyUsers returns users that belongs to the same organizations as you.
export async function getCompanyUsers (company: string): Promise<User> {
  const url = `/v1/companies/${company}`
  const response = await window.fetch(endpoint`${url}`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data.map(toCamelCaseObject) || []
}

export async function getTopCompanies (): Promise<Leaderboard[]> {
  const response = await window.fetch(endpoint`/v1/company/stats/top`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data || []
}

// searchCompany returns the names of the companies that matches the term.
export async function searchCompany (term: string): Promise<string[]> {
  const url = `/v1/search/companies?term=${term}`
  const response = await window.fetch(endpoint`${url}`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data || []
}

// searchColleague returns the users that belongs to the given company.
export async function searchColleague ({
  company,
  limit,
  offset
}: {
  company: string
  limit: number
  offset: number
}): Promise<UserPage> {
  const url = `/v1/search/colleagues?term=${company}&limit=${limit}&offset=${offset}`
  const response = await window.fetch(endpoint`${url}`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data, page } = await response.json()
  return {
    data: data.map(toCamelCaseObject) || [],
    page: page || newPage()
  }
}
