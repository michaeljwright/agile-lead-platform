import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

import {
  Game,
  CreateGameRequest,
  Roles
} from 'lib/firestore/types'

import { GameContextParams } from './types'
import { COLLECTION_GAME, createGame, firestore, updateGame, updatePlayer } from 'lib/firestore'
import { useRouter } from 'next/router'
import { useAuth } from 'context/auth'
import { useInterval } from 'hooks'
import { logEvent } from 'lib/analytics'
import { ANALYTICS_EVENTS } from 'constants/analytics'
import { signOut } from 'lib/auth'
import { paths } from 'constants/theme/routes'

const GameContext = createContext({} as GameContextParams)
const baseCountDown = 3

export function GameProvider ({ children }: any) {
  const router = useRouter()
  const auth = useAuth()

  const [isLoaded, setIsLoaded] = useState(false)

  const { id } = router.query

  const [game, setGame] = useState<Game | null>(null)
  const [countDown, setCountDown] = useState<number>(3)

  const participants = useMemo(() => game
    ?.players
    ?.filter(player => player.id !== auth.user?.uid) || []
  , [game?.players, auth.user])

  const player = game?.players?.find(player => player?.id === auth?.user?.uid)

  const players = game?.players || []

  const isAdmin = player?.role === Roles.admin

  const issues = game?.issues || []

  const activeIssue = game?.issues?.find(issue => issue.id === game?.activeIssue)

  const canReveal = players.length > 0 && players
    .filter(player => !player.vote)
    .length === 0

  const handleCreateGame = async (payload: CreateGameRequest) => {
    const game = await createGame({
      ...payload
    })

    setGame(game)
    logEvent(ANALYTICS_EVENTS.CREATE_GAME, {
      id: game.id
    })

    return game
  }

  const handleChangeActiveIssue = async (issueId: string) => {
    if (!game || !game.issues) return

    const isActiveIssue = game.activeIssue === issueId

    const activeIssue = isActiveIssue ? null : issueId

    const players = game?.players || []

    for (const player of players) {
      await updatePlayer(id as string, player.id, {
        vote: ''
      })
    }

    return await updateGame(game.id, {
      isPlaying: true,
      isReveal: false,
      activeIssue
    })
  }

  const handleRevealCards = async () => {
    if (!id) return
    setCountDown(baseCountDown)

    await updateGame(id as string, {
      isPlaying: false
    })
  }

  const handleRestart = async () => {
    if (!game) return

    const players = game?.players || []

    await updateGame(id as string, {
      isPlaying: true,
      isReveal: false,
      activeIssue: null
    })

    for (const player of players) {
      await updatePlayer(id as string, player.id, {
        vote: ''
      })
    }

    setCountDown(baseCountDown)
  }

  const handleChangeIssueVote = async (issueId: string, vote: string) => {
    if (!game || !game.issues) return

    const issues = game.issues.map(issue =>
      issue.id === issueId
        ? ({
          ...issue,
          vote
        })
        : issue
    )

    return await updateGame(game.id, {
      issues
    })
  }

  const handleChangeIssueValue = async (issueId: string | undefined, value: string) => {
    if (!game || !game.issues) return

    const issues = game.issues.map(issue =>
      issue.id === issueId
        ? ({
          ...issue,
          value
        })
        : issue
    )

    return await updateGame(game.id, {
      issues
    })
  }

  const revealCards = async () => {
    if (countDown === 1 && id && isAdmin) {
      await updateGame(id as string, {
        isReveal: true
      })
    }

    setCountDown(prevState => prevState > 0 ? prevState - 1 : 0)
  }

  const handleRemovePlayer = async (userId: string) => {
    const playersFiltered = players.filter(player => player.id !== userId)

    await updateGame(id as string, {
      players: playersFiltered
    })

    if (userId === auth.user?.uid) {
      await signOut()
      router.push(paths.home)
    }
  }

  const handleRemoveIssue = async (issueId: string) => {
    if (!game || !game.issues) return

    const issues = game.issues.filter(issue => issue.id !== issueId)

    await updateGame(game.id, {
      issues
    })
  }

  useInterval(revealCards, game && !game?.isPlaying ? 1000 : null)

  useEffect(() => {
    // if (!auth?.isSigned) router.push(paths.home)
    if (!game?.isPlaying) return
    setCountDown(baseCountDown)
  }, [game?.isPlaying])

  useEffect(() => {
    if (!id) return

    const unsubscribe = onSnapshot(doc(firestore, COLLECTION_GAME, id as string), (doc) => {
      const gameData = doc.data() as Game
      setGame(gameData)
      setIsLoaded(true)
    })
    return () => unsubscribe()
  }, [id])

  return (
    <GameContext.Provider
      value={{
        game,
        issues,
        player,
        participants,
        countDown,
        canReveal,
        activeIssue,
        isLoaded,
        createGame: handleCreateGame,
        onReveal: handleRevealCards,
        onRestart: handleRestart,
        onChangeActiveIssue: handleChangeActiveIssue,
        onRemovePlayer: handleRemovePlayer,
        onChangeIssueVote: handleChangeIssueVote,
        onChangeIssueValue: handleChangeIssueValue,
        onRemoveIssue: handleRemoveIssue
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
