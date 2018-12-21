import { User, PageInfo, Leaderboard } from '@/models'
import { toCamelCaseObject } from '@/helpers/camel-case'
import { endpoint } from '@/helpers/uri'

export interface GetUsersResponse {
  users: User[];
  pageInfo: PageInfo;
}

export async function getUsers (): Promise<GetUsersResponse> {
  const response = await window.fetch(endpoint`/v1/users`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data, page_info: pageInfo } = await response.json()
  return {
    users: data.map(toCamelCaseObject),
    pageInfo
  }
}

export async function getUserCountByYears (): Promise<Leaderboard[]> {
  const response = await window.fetch(endpoint`/v1/years/users`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data
}

export async function getCompanyCount (): Promise<Leaderboard[]> {
  const response = await window.fetch(endpoint`/v1/companies`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data
}
