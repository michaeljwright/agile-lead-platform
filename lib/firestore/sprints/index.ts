import {
  query,
  collection,
  doc,
  getDoc,
  where,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { firebase } from 'lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import {
  CreateSprintRequest,
  CreateWasteRequest,
  CreateGoalRequest,
  Sprint,
  UpdateSprintRequest,
  UpdateWasteRequest,
  UpdateGoalRequest
} from '../types'
import { getTeam, COLLECTION_TEAM } from '../teams'

const firestore = getFirestore(firebase)

export const COLLECTION_SPRINT = 'sprints'

export async function getSprints (teamId: string) {
  try {
    const combinedSprintsData: any[] = []
    const sprints = query(collection(firestore, COLLECTION_TEAM + '/' + teamId + '/' + COLLECTION_SPRINT), where('isDeleted', '==', false), orderBy('createdAt', 'desc'))
    const querySprintsSnapshot = await getDocs(sprints)
    querySprintsSnapshot.forEach((doc) => {
      combinedSprintsData.push(doc.data())
    })
    return combinedSprintsData
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function getSprint (teamId: string, id: string) {
  try {
    return (await getDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_SPRINT, id))).data() as Sprint
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function createSprint (teamId: string, payload: CreateSprintRequest) {
  const id = uuidv4()

  try {
    await setDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_SPRINT, id), {
      id,
      teamId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      ...payload
    })

    const team = await getTeam(teamId)
    await updateDoc(doc(firestore, COLLECTION_TEAM, teamId), {
      sprints: team?.sprints ? team?.sprints + 1 : 1
    })
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }

  return await getSprint(teamId, id)
}

export async function createWaste (teamId: string, sprintId: string, payload: CreateWasteRequest) {
  const id = uuidv4()
  const sprintData = await getSprint(teamId, sprintId)

  const { name, type } = payload

  await updateDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_SPRINT, sprintId), {
    waste: [
      ...(sprintData?.waste || []),
      {
        id,
        name,
        type,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }
    ]
  })

  return await getSprint(teamId, sprintId)
}

export async function createGoal (teamId: string, sprintId: string, payload: CreateGoalRequest) {
  const id = uuidv4()
  const sprintData = await getSprint(teamId, sprintId)

  const { name } = payload

  await updateDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_SPRINT, sprintId), {
    goals: [
      ...(sprintData?.goals || []),
      {
        id,
        name,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }
    ]
  })

  return await getSprint(teamId, sprintId)
}

export async function updateSprint (teamId: string, sprintId: string, payload: UpdateSprintRequest) {
  await updateDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_SPRINT, sprintId), payload)
}

export async function updateSprintStatus (teamId: string, sprintId: string, status: boolean) {
  const data = await getSprint(teamId, sprintId)

  if (!data) throw new Error('Sprint not found')

  await updateDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_SPRINT, sprintId), {
    isActive: status
  })

  return data
}

export async function updateWaste (teamId: string, sprintId: string, payload: UpdateWasteRequest) {
  const data = await getSprint(teamId, sprintId)

  if (!data) throw new Error('Sprint not found')

  const waste = data?.waste?.map(waste =>
    waste.id === payload.id
      ? ({
        ...payload,
        updatedAt: Timestamp.now()
      })
      : waste
  )

  await updateDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_SPRINT, sprintId), {
    waste
  })

  return await getSprint(teamId, sprintId)
}

export async function updateGoal (teamId: string, sprintId: string, payload: UpdateGoalRequest) {
  const data = await getSprint(teamId, sprintId)

  if (!data) throw new Error('Sprint not found')

  const goals = data?.goals?.map(goal =>
    goal.id === payload.id
      ? ({
        ...payload,
        updatedAt: Timestamp.now()
      })
      : goal
  )

  await updateDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_SPRINT, sprintId), {
    goals
  })

  return await getSprint(teamId, sprintId)
}

export async function deleteSprint (teamId: string, sprintId: string) {
  try {
    await updateDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_SPRINT, sprintId), {
      isDeleted: true
    })
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }
}
