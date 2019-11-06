import User from './user'
import Leaderboard from './leaderboard'

export default interface LeaderboardUserWithStats {
  user: User
  languages: Leaderboard[]
  count: number
}
