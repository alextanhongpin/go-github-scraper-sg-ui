import { User } from './user'
import { Leaderboard } from './leaderboard'

export interface LeaderboardUserWithStats {
  user: User,
  languages: Leaderboard[],
  count: number
}
