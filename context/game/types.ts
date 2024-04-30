import type {
  Game,
  CreateGameRequest,
  IIssue,
  Player
} from 'lib/firestore/types'

export interface GameContextParams {
  game?: Game | null
  issues: IIssue[]
  player?: Player
  activeIssue?: IIssue
  participants?: Player[]
  countDown: number
  canReveal?: boolean
  isLoaded: boolean
  createGame: (payload: CreateGameRequest) => Promise<Game>
  onRemovePlayer?: (userId: string) => Promise<void>
  onChangeActiveIssue?: (issueId: string) => Promise<void>
  onReveal: () => Promise<void>
  onRestart: () => Promise<void>
  onChangeIssueVote: (issueId: string, vote: string) => Promise<void>
  onChangeIssueValue: (issueId: string | undefined, value: string) => Promise<void>
  onRemoveIssue: (issueId: string) => Promise<void>
}
