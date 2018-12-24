import { User, Leaderboard } from '@/models'

export default interface RootState {
  version: string;
  brand: string;
  userCache: Map<string, User>,
  userLanguagesCache: Map<string, Leaderboard[]>,
  githubUri: string
}
