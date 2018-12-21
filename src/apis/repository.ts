import { PageInfo, Repository, Leaderboard } from '@/models'
import { toCamelCaseObject } from '@/helpers/camel-case'
import { endpoint } from '@/helpers/uri'

export interface GetRepositoriesResponse {
  pageInfo: PageInfo;
  data: Repository[];
  count: number;
}

export async function getRepositories (): Promise<GetRepositoriesResponse> {
  const response = await window.fetch(endpoint`/v1/repositories`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data, count, page_info: pageInfo } = await response.json()
  return {
    pageInfo,
    count,
    data: data.map(toCamelCaseObject)
  }
}

export async function getRecentRepositories (): Promise<Repository[]> {
  const response = await window.fetch(endpoint`/v1/recents/repositories`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data.map(toCamelCaseObject)
}

export async function getLeaderboardRepository (): Promise<Leaderboard[]> {
  const response = await window.fetch(endpoint`/v1/leaderboards/repositories`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data
}

export async function getLeaderboardLanguage (): Promise<Leaderboard[]> {
  const response = await window.fetch(endpoint`/v1/leaderboards/languages`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data
}

export async function getLeaderboardUser (): Promise<Leaderboard[]> {
  const response = await window.fetch(endpoint`/v1/leaderboards/users`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data
}

export async function getRepositoryCountByYears (): Promise<Leaderboard[]> {
  const response = await window.fetch(endpoint`/v1/years/repositories`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data
}
