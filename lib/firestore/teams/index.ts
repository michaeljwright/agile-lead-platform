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
  documentId,
  Timestamp
} from 'firebase/firestore'
import { firebase } from 'lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import {
  InviteUserRequest,
  User,
  Team,
  Organisation,
  CreateOrgRequest,
  CreateTeamRequest
} from './../types'
import {
  getUser,
  updateResources,
  COLLECTION_PARTICIPANT,
  COLLECTION_USER
} from '../common'

const firestore = getFirestore(firebase)

export const COLLECTION_TEAM = 'teams'
export const COLLECTION_INVITE = 'invites'
export const COLLECTION_ORGANISATION = 'organisations'

export async function getTeam (id: string) {
  try {
    return (await getDoc(doc(firestore, COLLECTION_TEAM, id))).data() as Team
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function getOrg (id: string) {
  try {
    return (await getDoc(doc(firestore, COLLECTION_ORGANISATION, id))).data() as Organisation
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function getTeamUsers (teamId: string) {
  try {
    const combinedUsersData: any[] = []
    const users = query(collection(firestore, COLLECTION_TEAM + '/' + teamId + '/' + COLLECTION_USER), orderBy('name', 'asc'))
    const queryTeamUsersSnapshot = await getDocs(users)
    queryTeamUsersSnapshot.forEach((doc) => {
      combinedUsersData.push(doc.data())
    })
    return combinedUsersData
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function getTeams (uid: string, sort: string = 'name') {
  try {
    let combinedResourceData: any[] = []
    const combinedTeamsData: any[] = []

    const resources = query(collection(firestore, COLLECTION_PARTICIPANT), where(documentId(), '==', uid))
    const queryResourcesSnapshot = await getDocs(resources)
    queryResourcesSnapshot.forEach((doc) => {
      combinedResourceData = doc.data().resources
    })

    if (combinedResourceData && combinedResourceData.length) {
      while (combinedResourceData.length) {
        const teamsData = combinedResourceData.splice(0, 30)
        const teams = query(collection(firestore, COLLECTION_TEAM), where(documentId(), 'in', [...teamsData]), where('isDeleted', '==', false))
        const queryTeamsSnapshot = await getDocs(teams)
        queryTeamsSnapshot.forEach((doc) => {
          combinedTeamsData.push(doc.data())
        })
      }

      return Promise.all(combinedTeamsData.sort((a, b) => a[sort] > b[sort] ? 1 : -1))
        .then(content => content.flat())
    } else {
      return []
    }
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function getOrgs (uid: string) {
  try {
    const combinedOrgData: string[] = []
    const orgs = query(collection(firestore, COLLECTION_ORGANISATION), where('admins', 'array-contains', uid))
    const queryOrgsSnapshot = await getDocs(orgs)
    queryOrgsSnapshot.forEach((doc) => {
      const org = doc.data()
      combinedOrgData.push(org?.id)
    })

    const userOrgs = (await getDoc(doc(firestore, COLLECTION_USER, uid))).data()

    return userOrgs?.orgs === undefined ? combinedOrgData : combinedOrgData.concat(userOrgs?.orgs)
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function updateOrgAdmins (orgId: string, admins: string[]) {
  const data = await getOrg(orgId)

  if (!data) throw new Error('Org not found or access denied')

  await updateDoc(doc(firestore, COLLECTION_ORGANISATION, orgId), {
    admins
  })

  return data
}

export async function updateUserOrg (uid: string, orgId: string) {
  try {
    const user = await getUser(uid)

    if (user) {
      await updateDoc(doc(firestore, COLLECTION_USER, uid), {
        orgs: [...user?.org || [], orgId]
      })
    } else {
      await setDoc(doc(firestore, COLLECTION_USER, uid), {
        id: uid,
        orgs: [orgId],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
    }
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }
}

export async function createOrg (uid: string, payload: CreateOrgRequest) {
  const orgId = uuidv4()

  try {
    await updateUserOrg(uid, orgId)

    await setDoc(doc(firestore, COLLECTION_ORGANISATION, orgId), {
      id: orgId,
      ...payload,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }

  return await getOrg(orgId)
}

export async function createTeam (payload: CreateTeamRequest) {
  const teamId = uuidv4()
  const creatorId = payload.creator.id

  try {
    await updateResources(teamId, payload.creator)

    await setDoc(doc(firestore, COLLECTION_TEAM, teamId), {
      id: teamId,
      ...payload,
      isActive: true,
      isDeleted: false,
      users: 1,
      sprints: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })

    await setDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_USER, creatorId), {
      ...payload.creator
    })
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }

  return await getTeam(teamId)
}

export async function updateTeamStatus (teamId: string, status: boolean) {
  const data = await getTeam(teamId)

  if (!data) throw new Error('Team not found')

  await updateDoc(doc(firestore, COLLECTION_TEAM, teamId), {
    isActive: status
  })

  return data
}

export async function deleteTeam (teamId: string) {
  try {
    await updateDoc(doc(firestore, COLLECTION_TEAM, teamId), {
      isDeleted: true
    })
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }
}

export async function inviteUser (uid: string, teamId: string, payload: InviteUserRequest) {
  let success = false
  try {
    const team = await getTeam(teamId)
    const invite = (await getDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_INVITE, uid))).data()

    if (!invite) {
      await setDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_INVITE, uid), {
        id: uid,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        orgId: team?.orgId || null,
        ...payload
      })
    } else {
      const orgId = invite?.orgId ? invite?.orgId : team?.orgId
      await updateDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_INVITE, uid), {
        updatedAt: Timestamp.now(),
        orgId,
        emails: [
          ...payload?.emails,
          ...(invite?.emails)
        ]
      })
    }

    success = true
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }

  return success
}

export async function acceptInvite (uid: string, teamId: string, user: User) {
  let callback = null
  try {
    const invite = (await getDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_INVITE, uid))).data()

    if (!invite) {
      callback = 'Looks like your invite does not exist or you no longer have access.'
    } else {
      await updateResources(teamId, user)
      await setDoc(doc(firestore, COLLECTION_TEAM, teamId, COLLECTION_USER, user?.id), {
        ...user
      })
      const team = await getTeam(teamId)
      await updateDoc(doc(firestore, COLLECTION_TEAM, teamId), {
        users: team?.users + 1
      })
      await updateUserOrg(user?.id, invite?.orgId)
    }
  } catch (err: any) {
    console.log(err)
    callback = err?.message || 'An unexplained error occurred. Please try again or contact our support.'
  }

  return callback
}
