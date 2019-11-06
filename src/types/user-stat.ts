import  User  from './user'
import  Leaderboard  from './leaderboard'

export default interface UserStat {
  user: User
  languages: Leaderboard[]
}
