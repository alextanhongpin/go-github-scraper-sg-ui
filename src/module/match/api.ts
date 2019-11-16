import { Score, Repository } from '@/types'
import { endpoint } from '@/models/uri'
import { toCamelCaseObject } from '@/models/camel-case'

// getRecommendations returns the matches for a particular user ordered by the
// similarity score.
export async function getRecommendations (login: string): Promise<Score[]> {
  const response = await window.fetch(endpoint`/v1/matches/${login}`)
  if (!response.ok) {
    const { error } = await response.json()
    return []
  }
  const { data } = await response.json()
  return data
}

// getRepositoriesByUser returns the top 10 repositories by users with the most
// stargazers.
export async function getRepositoriesByUser (
  login: string
): Promise<Repository> {
  const url = `/v1/users/${login}/repositories`
  const response = await window.fetch(endpoint`${url}`)
  if (!response.ok) {
    const { error } = await response.json()
    throw new Error(error)
  }
  const { data } = await response.json()
  return data.map(toCamelCaseObject)
}
