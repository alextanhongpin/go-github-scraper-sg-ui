import { User } from './user'
import { Leaderboard } from './leaderboard'

export interface UserStat {
  user: User;
  languages: Leaderboard[];
}
