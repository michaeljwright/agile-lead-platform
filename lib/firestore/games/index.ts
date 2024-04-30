import {
  query,
  collection,
  doc,
  getDoc,
  where,
  getDocs,
  deleteDoc,
  getFirestore,
  setDoc,
  updateDoc,
  documentId,
  Timestamp
} from 'firebase/firestore'
import { firebase } from 'lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import {
  CreateGameRequest,
  Game,
  CreateIssueRequest,
  IIssue,
  UpdateGameRequest,
  CreatePlayerRequest,
  UpdatePlayerRequest
} from './../types'
import {
  updateResources,
  COLLECTION_PARTICIPANT
} from '../common'
import { updateUserOrg } from '../teams'

const firestore = getFirestore(firebase)

export const COLLECTION_GAME = 'games'

export async function getGame (id: string) {
  try {
    return (await getDoc(doc(firestore, COLLECTION_GAME, id))).data() as Game
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function getGames (uid: string, sort: string = 'name') {
  try {
    let combinedResourceData: any[] = []
    const combinedGameData: any[] = []

    const resources = query(collection(firestore, COLLECTION_PARTICIPANT), where(documentId(), '==', uid))
    const queryResourcesSnapshot = await getDocs(resources)
    queryResourcesSnapshot.forEach((doc) => {
      combinedResourceData = doc.data().resources
    })

    if (combinedResourceData && combinedResourceData.length) {
      while (combinedResourceData.length) {
        const gamesData = combinedResourceData.splice(0, 30)
        const games = query(collection(firestore, COLLECTION_GAME), where(documentId(), 'in', [...gamesData]))
        const queryGamesSnapshot = await getDocs(games)
        queryGamesSnapshot.forEach((doc) => {
          combinedGameData.push(doc.data())
        })
      }

      return Promise.all(combinedGameData)
        .then(content => content.flat())
    } else {
      return []
    }
  } catch (err) {
    throw new Error(err as any)
  }
}

export async function createGame (payload: CreateGameRequest) {
  const id = uuidv4()

  try {
    await updateResources(id, payload.creator)

    await setDoc(doc(firestore, COLLECTION_GAME, id), {
      id,
      ...payload,
      isPlaying: true,
      isReveal: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }

  return await getGame(id)
}

export async function createIssue (gameId: string, payload: CreateIssueRequest) {
  const id = uuidv4()
  const gameData = await getGame(gameId)

  const { value } = payload

  const issue = await updateDoc(doc(firestore, COLLECTION_GAME, gameId), {
    issues: [
      ...(gameData?.issues || []),
      {
        id,
        value,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      }
    ]
  })

  return issue
}

export async function updateGame (gameId: string, payload: UpdateGameRequest) {
  await updateDoc(doc(firestore, COLLECTION_GAME, gameId), payload)
}

export async function updateIssue (gameId: string, issueId: string, payload: Partial<IIssue>) {
  const data = await getGame(gameId)

  if (!data) throw new Error('Game not found')

  const issues = data?.issues?.map(issue =>
    issue.id === issueId
      ? ({
        ...issue,
        ...payload,
        updatedAt: Timestamp.now()
      })
      : issue
  )

  const game: UpdateGameRequest = {
    issues
  }

  await updateGame(gameId, game)
}

export async function createPlayer (gameId: string, payload: CreatePlayerRequest) {
  try {
    await updateResources(gameId, payload)
    const game = await getGame(gameId)

    if (game?.orgId) {
      await updateUserOrg(payload?.id, game?.orgId)
    }

    const players = [...game?.players?.filter(player =>
      player.id !== payload.id
    ), payload]

    await updateDoc(doc(firestore, COLLECTION_GAME, gameId), {
      players
    })

    return payload
  } catch (err) {
    console.log(err)
    throw new Error(err as any)
  }
}

export async function updatePlayer (gameId: string, playerId: string, payload: UpdatePlayerRequest) {
  const data = await getGame(gameId)

  if (!data) throw new Error('Board not found')

  const players = data?.players?.map(player =>
    player.id === playerId
      ? ({
        ...player,
        ...payload
      })
      : player
  )

  const game: UpdateGameRequest = {
    players
  }

  await updateGame(gameId, game)
}

export async function deleteGame (gameId: string) {
  const docRef = doc(firestore, COLLECTION_GAME, gameId)
  deleteDoc(docRef).then(() => {
    console.log('Doc deleted')
  }).catch(err => {
    console.log(err)
    throw new Error(err as any)
  })
}
