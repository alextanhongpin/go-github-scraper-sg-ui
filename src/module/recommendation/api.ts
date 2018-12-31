import { Score, Repository } from '@/models'
import { endpoint } from '@/helpers/uri'
import { toCamelCaseObject } from '@/helpers/camel-case'

// getRecommendations returns the matches for a particular user ordered by the
// similarity score.
export async function getRecommendations (login: string): Promise<Score[]> {
  const response = await window.fetch(endpoint`/v1/recommendations/users/${login}`)
  if (!response.ok) {
    const { error } = await response.json()
    return []
  }
  const { data } = await response.json()
  return data
}

// getUsersWithRecommendations returns the list of user logins that has
// recommendations.
export async function getUsersWithRecommendations (): Promise<string[]> {
  const response = await window.fetch(endpoint`/v1/recommendations/users`)
  if (!response.ok) {
    const { error } = await response.json()
    throw new Error(error)
  }
  const { data } = await response.json()
  return data
}

// getRepositoriesByUser returns the top 10 repositories by users with the most
// stargazers.
export async function getRepositoriesByUser (login: string): Promise<Repository> {
  const url = `/v1/repositories/${login}/stargazers`
  const response = await window.fetch(endpoint`${url}`)
  if (!response.ok) {
    const { error } = await response.json()
    throw new Error(error)
  }
  const { data } = await response.json()
  return data.map(toCamelCaseObject)
}
