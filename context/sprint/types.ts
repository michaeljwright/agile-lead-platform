import type {
  Sprint,
  CreateSprintRequest,
  CreateWasteRequest,
  CreateGoalRequest,
  UpdateWasteRequest,
  UpdateGoalRequest
} from 'lib/firestore/types'

export interface SprintContextParams {
  sprint?: Sprint | null | void
  teamId?: string
  isLoaded: boolean
  createSprint: (payload: CreateSprintRequest) => Promise<Sprint>
  createWaste: (payload: CreateWasteRequest) => Promise<Sprint>
  createGoal: (payload: CreateGoalRequest) => Promise<Sprint>
  updateWaste: (payload: UpdateWasteRequest) => Promise<Sprint | void>
  updateGoal: (payload: UpdateGoalRequest) => Promise<Sprint | void>
  onRemoveGoal: (goalId: string) => Promise<void>
  onRemoveWaste: (wasteId: string) => Promise<void>
}
