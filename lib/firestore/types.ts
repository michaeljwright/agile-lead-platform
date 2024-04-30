export enum Roles {
  admin = 'admin',
  player = 'player',
  user = 'user'
}

export enum Subscription {
  free = 'free',
  pro = 'pro',
  enterprise = 'enterprise'
}

export interface IIssue {
  value: string
  id: string
  description?: string
  link?: string
  vote?: string
}

export interface Player {
  id: string
  name: string
  email?: string
  isAnonymous?: boolean
  vote?: string
  isSpectator?: boolean
  role?: keyof typeof Roles
  type?: keyof typeof Subscription
  orgId?: string
}

export interface User {
  id: string
  name: string
  email?: string
  isAnonymous?: boolean
  vote?: string
  isSpectator?: boolean
  photoURL?: string
  role?: keyof typeof Roles
  type?: keyof typeof Subscription
  orgId?: string
}

export interface Game {
  id: string
  name: string
  issues?: IIssue[]
  activeIssue?: string | null
  players: Player[]
  player?: Player
  isPlaying?: boolean
  isReveal?: boolean
  orgId?: string
}

export interface Goal {
  id: string
  name: string
  creator?: User
  isActive?: boolean
}

export interface Waste {
  id: string
  name?: string
  type?: string[]
  x?: number
  y?: number
  creator?: User
  isActive?: boolean
}

export interface Sprint {
  id: string
  name: string
  teamId: string
  startAt: Date
  endAt: Date
  goals?: Goal[]
  waste?: Waste[]
  creator?: User
  isActive?: boolean
  isDeleted?: boolean
}

export interface Team {
  id: string
  name: string
  users: number
  sprints: number
  creator?: User
  orgId?: string
  isActive?: boolean
  isDeleted?: boolean
}

export interface Organisation {
  id: string
  isActive?: boolean
  type?: keyof typeof Subscription
  admins?: string[]
}

export interface Invite {
  email: string
}

export interface ParticipantResources {
  id: string
  resources: string[]
}

export interface CreateOrgRequest extends
  Pick<Organisation, 'isActive' > {
  type?: keyof typeof Subscription
  admins?: string[]
  games?: number
  teams?: number
}

export interface CreateGameRequest extends
  Pick<Game, 'name' > {
    creator: Player
    orgId?: string | null
    players?: Player[]
}

export interface CreateTeamRequest extends
  Pick<Team, 'name' > {
    creator: User
    orgId?: string
}
export interface CreateWasteRequest extends
  Pick<Waste, 'name' > {
    id?: string
    type?: string[]
    x?: number
    y?: number
}

export interface CreateGoalRequest extends
  Pick<Goal, 'name' > {
    id?: string
    isActive?: boolean
}

export interface CreateSprintRequest extends
  Pick<Sprint, 'name' > {
    startAt: Date
    endAt: Date
    creator: User
    isActive: boolean
    isDeleted: boolean
    goals: Goal[]
    waste: Waste[]
}

export interface UpdateUserRequest {
  name: string
  photoURL?: string
  role?: keyof typeof Roles
  type?: keyof typeof Subscription
}

export interface InviteUserRequest {
    emails: string[],
    orgId?: string
}

export interface UpdateWasteRequest extends
  Pick<Waste, 'name'> {
    id?: string
    type?: string
    x?: number
    y?: number
}

export interface UpdateGoalRequest extends
  Pick<Goal, 'name' > {
    id?: string
}

export type CreateIssueRequest = Pick<IIssue, 'value'>
export type CreatePlayerRequest = Pick<Player, 'name' | 'email' | 'isAnonymous' | 'id' | 'role' | 'type' | 'orgId'>

export type UpdateGameRequest = Partial<Game>
export type UpdateSprintRequest = Partial<Sprint>
export type UpdatePlayerRequest = Partial<Player>
export type UpdateIssueRequest = Partial<IIssue>
