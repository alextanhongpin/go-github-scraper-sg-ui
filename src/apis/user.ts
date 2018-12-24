import {
  User,
  PageInfo,
  Leaderboard,
  UserStat
} from '@/models'

import { toCamelCaseObject } from '@/helpers/camel-case'
import { endpoint } from '@/helpers/uri'

export interface GetUsersResponse {
  users: User[];
  pageInfo: PageInfo;
  count: number;
}

export async function getUsers (): Promise<GetUsersResponse> {
  const response = await window.fetch(endpoint`/v1/users`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { count, data, page_info: pageInfo } = await response.json()
  return {
    users: data.map(toCamelCaseObject),
    pageInfo,
    count
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

export async function getCompanyCount (): Promise<number> {
  const response = await window.fetch(endpoint`/v1/companies`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { count } = await response.json()
  return count
}

export async function getUserStats (login: string): Promise<UserStat> {
  const response = await window.fetch(endpoint`/v1/userstats/${login}`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data
}
