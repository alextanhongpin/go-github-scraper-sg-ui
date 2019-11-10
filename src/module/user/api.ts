import { User, Score, PageInfo, Leaderboard, UserStat } from '@/types'

import { toCamelCaseObject } from '@/helpers/camel-case'
import { endpoint } from '@/helpers/uri'

export interface GetUsersResponse {
  users: User[]
  count: number
}

// function throttle (durationInMs: number) {
//   let timeout
//   return function (fn: Function) {
//     if (timeout) {
//       window.clearTimeout(timeout)
//     }
//     timeout = window.setTimeout(() => {
//       fn()
//     }, durationInMs)
//   }
// }

export async function * getUsersGenerator (): AsyncIterator<GetUsersResponse> {
  let prevPageInfo: PageInfo = {
    startCursor: '',
    endCursor: '',
    hasPreviousPage: false,
    hasNextPage: true
  }
  while (prevPageInfo.hasNextPage) {
    const hasCursor = prevPageInfo && prevPageInfo.endCursor.length > 0
    const withCursor = `/v1/users?cursor=${prevPageInfo.endCursor}`
    const response = await window.fetch(
      hasCursor ? endpoint`${withCursor}` : endpoint`/v1/users`
    )
    if (!response.ok) {
      throw new Error(await response.text())
    }
    const { count, data, page_info: pageInfo } = await response.json()
    const result = {
      users: data.map(toCamelCaseObject),
      count
      // pageInfo: toCamelCaseObject(pageInfo)
    }
    prevPageInfo = { ...prevPageInfo, ...toCamelCaseObject(pageInfo) }
    yield result
  }
}

export async function getUserCount (): Promise<number> {
  const response = await window.fetch(endpoint`/v1/users`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { count } = await response.json()
  return count || 0
}

export async function getYearOverYearUsers (): Promise<Leaderboard[]> {
  const response = await window.fetch(endpoint`/v1/user/stats`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data || []
}

export async function getCompanyCount (): Promise<number> {
  const response = await window.fetch(endpoint`/v1/companies`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { count } = await response.json()
  return count || 0
}

// TODO: Rename this.
export async function getUserStats (login: string): Promise<UserStat> {
  const response = await window.fetch(endpoint`/v1/users/${login}`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  data.user = toCamelCaseObject(data.user)
  return data
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

export async function searchUser (term: string): Promise<string[]> {
  const url = `/v1/search/users?term=${term}`
  const response = await window.fetch(endpoint`${url}`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data || []
}

export async function searchCompanies(term: string): Promise<string[]> {
  const url = `/v1/search/companies?term=${term}`
  const response = await window.fetch(endpoint`${url}`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data || []
}
