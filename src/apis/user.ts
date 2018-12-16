import User from '@/models/user'
import PageInfo from '@/models/page-info'

import { toCamelCase } from '@/helpers/camel-case'

const GET_USERS = `${process.env.VUE_APP_API_URI}/v1/users`

interface GetUsersResponse {
  users: User[];
  pageInfo: PageInfo;
}

export async function getUsers (): Promise<GetUsersResponse> {
  const response = await window.fetch(GET_USERS)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const { data: users, page_info: pageInfo } = await response.json()
  return {
    users: users.map(user => {
      for (let key in user) {
        const newKey = toCamelCase(key)
        user[newKey] = user[key]
        if (newKey !== key) {
          delete user[key]
        }
      }
      return user
    }),
    pageInfo
  }
}
