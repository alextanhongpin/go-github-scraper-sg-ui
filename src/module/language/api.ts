import { Leaderboard } from '@/types'
import { endpoint } from '@/models/uri'
import { toCamelCaseObject } from '@/models/camel-case'

export async function getLeaderboardUserByLanguage (
  language: string
): Promise<Leaderboard[]> {
  const path = `/v1/repository/stats/language?language=${language}`
  const response = await window.fetch(endpoint`${path}`)
  if (!response.ok) {
    const { error } = await response.json()
    return []
  }
  const { data } = await response.json()
  return data
}

export async function searchLanguage (term: string): Promise<string[]> {
  const path = `/v1/search/languages?term=${term}`
  const response = await window.fetch(endpoint`${path}`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data } = await response.json()
  return data
}
