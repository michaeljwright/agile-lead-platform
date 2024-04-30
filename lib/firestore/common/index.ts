import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  Timestamp
} from 'firebase/firestore'
import { firebase } from 'lib/firebase'

import {
  CreatePlayerRequest,
  UpdateUserRequest,
  ParticipantResources
} from './../types'

const firestore = getFirestore(firebase)

export const COLLECTION_PARTICIPANT = 'participants'
export const COLLECTION_USER = 'users'

export async function getResources (id: string) {
  try {
    const data = (await getDoc(doc(firestore, COLLECTION_PARTICIPANT, id))).data() as ParticipantResources
    return data?.resources
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function updateResources (resourceId: string, payload: CreatePlayerRequest) {
  const resources = await getResources(payload.id)

  if (resources) {
    await updateDoc(doc(firestore, COLLECTION_PARTICIPANT, payload.id), {
      resources: [...resources || [], resourceId]
    })
  } else {
    await setDoc(doc(firestore, COLLECTION_PARTICIPANT, payload.id), {
      id: payload.id,
      resources: [resourceId]
    })
  }
}

export async function getUser (id: string) {
  try {
    return (await getDoc(doc(firestore, COLLECTION_USER, id))).data()
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function updateUser (uid: string, payload: UpdateUserRequest) {
  try {
    const user = await getUser(uid)

    if (user) {
      await updateDoc(doc(firestore, COLLECTION_USER, uid), {
        ...payload,
        updatedAt: Timestamp.now()
      })
    } else {
      await setDoc(doc(firestore, COLLECTION_USER, uid), {
        id: uid,
        ...payload,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
    }
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }

  return await getUser(uid)
}
