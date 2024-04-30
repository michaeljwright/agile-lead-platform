import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import {
  Sprint,
  CreateSprintRequest,
  CreateWasteRequest,
  CreateGoalRequest,
  UpdateWasteRequest,
  UpdateGoalRequest
} from 'lib/firestore/types'
import { SprintContextParams } from './types'
import { COLLECTION_TEAM, COLLECTION_SPRINT, createSprint, createWaste, createGoal, updateWaste, updateGoal, firestore, updateSprint } from 'lib/firestore'
import { useRouter } from 'next/router'
import { useAuth } from 'context/auth'
import { logEvent } from 'lib/analytics'
import { ANALYTICS_EVENTS } from 'constants/analytics'

const SprintContext = createContext({} as SprintContextParams)

export function SprintProvider ({ children }: any) {
  const router = useRouter()
  const auth = useAuth()

  const [isLoaded, setIsLoaded] = useState(false)

  const { teamId, sprintId } = router.query

  const [sprint, setSprint] = useState<Sprint | null | void>(null)

  const handleCreateSprint = async (payload: CreateSprintRequest) => {
    const sprintData = await createSprint(teamId as string, {
      ...payload
    })

    setSprint(sprintData)

    logEvent(ANALYTICS_EVENTS.CREATE_SPRINT, {
      id: sprint?.id,
      uid: auth?.user?.uid
    })

    return sprintData
  }

  const handleCreateWaste = async (payload: CreateWasteRequest) => {
    const sprintData = await createWaste(sprint?.teamId as string, sprint?.id as string, {
      ...payload
    })

    setSprint(sprintData)

    logEvent(ANALYTICS_EVENTS.CREATE_WASTE, {
      id: sprintData?.id,
      uid: auth?.user?.uid
    })

    return sprintData
  }

  const handleCreateGoal = async (payload: CreateGoalRequest) => {
    const sprintData = await createGoal(sprint?.teamId as string, sprint?.id as string, {
      ...payload
    })

    logEvent(ANALYTICS_EVENTS.CREATE_GOAL, {
      id: sprintData?.id,
      uid: auth?.user?.uid
    })

    return sprintData
  }

  const handleUpdateWaste = async (payload: UpdateWasteRequest) => {
    if (!sprint || !sprint.waste) return

    return await updateWaste(sprint.teamId, sprint.id, payload)
  }

  const handleUpdateGoal = async (payload: UpdateGoalRequest) => {
    if (!sprint || !sprint.goals) return

    return await updateGoal(sprint.teamId, sprint.id, payload)
  }

  const handleRemoveGoal = async (goalId: string) => {
    if (!sprint || !sprint.goals) return

    const goals = sprint.goals.filter(goal => goal.id !== goalId)

    await updateSprint(sprint.teamId, sprint.id, {
      goals
    })
  }

  const handleRemoveWaste = async (wasteId: string) => {
    if (!sprint || !sprint.waste) return

    const waste = sprint.waste.filter(waste => waste.id !== wasteId)

    await updateSprint(sprint.teamId, sprint.id, {
      waste
    })
  }

  useEffect(() => {
    if (!sprintId || !teamId) return

    const unsubscribe = onSnapshot(doc(firestore, COLLECTION_TEAM + '/' + teamId + '/' + COLLECTION_SPRINT + '/' + sprintId), (doc) => {
      const sprintData = doc.data() as Sprint
      setSprint(sprintData)
      setIsLoaded(true)
    })
    return () => unsubscribe()
  }, [sprintId, teamId])

  return (
    <SprintContext.Provider
      value={{
        sprint,
        isLoaded,
        createSprint: handleCreateSprint,
        createWaste: handleCreateWaste,
        createGoal: handleCreateGoal,
        updateWaste: handleUpdateWaste,
        updateGoal: handleUpdateGoal,
        onRemoveGoal: handleRemoveGoal,
        onRemoveWaste: handleRemoveWaste
      }}
    >
      {children}
    </SprintContext.Provider>
  )
}

export const useSprint = () => useContext(SprintContext)
