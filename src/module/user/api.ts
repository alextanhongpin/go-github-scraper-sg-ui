import {
  User,
  Score,
  PageInfo,
  Leaderboard,
  UserStat
} from '@/models'

import { toCamelCaseObject } from '@/helpers/camel-case'
import { endpoint } from '@/helpers/uri'

export interface GetUsersResponse {
  users: User[];
  count: number;
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
    const response = await window.fetch(hasCursor
      ? endpoint`${withCursor}`
      : endpoint`/v1/users`)
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
  data.user = toCamelCaseObject(data.user)
  return data
}