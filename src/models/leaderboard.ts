import { User } from '@/models/user'

export interface Leaderboard {
  name: string;
  count: number;
}

export interface LeaderboardUserLanguage {
  user: User;
  count: number;
}
