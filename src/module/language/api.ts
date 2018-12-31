import { Leaderboard } from '@/models'
import { endpoint } from '@/helpers/uri'
import { toCamelCaseObject } from '@/helpers/camel-case'

export async function getLanguages (): Promise<string[]> {
  const response = await window.fetch(endpoint`/v1/languages`)
  if (!response.ok) {
    const { error } = await response.json()
    return []
  }
  const { data } = await response.json()
  return data
}

export async function getLeaderboardUserByLanguage (language: string): Promise<Leaderboard[]> {
  const path = `/v1/leaderboards/languages/${language}`
  const response = await window.fetch(endpoint`${path}`)
  if (!response.ok) {
    const { error } = await response.json()
    return []
  }
  const { data } = await response.json()
  return data
}
