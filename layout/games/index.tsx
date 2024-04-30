import {
  useEffect,
  useCallback,
  useState
} from 'react'
import { getGames, deleteGame } from 'lib/firestore'
import { useAuth } from 'context/auth'
import { Card, Flex } from '@radix-ui/themes'
import { Avatar } from 'layout/game/components'
import { Box, Button, ButtonIcon, Icon, Container, Typography, Header, LoadingSkeleton, Toast } from 'components/common'
import * as Styles from './styles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { resolvePath } from 'utils/helpers'
import { paths } from 'constants/theme/routes'
import { Cross2Icon } from '@radix-ui/react-icons'

export function GamesLayout () {
  const [gameData, setGameData] = useState<any>([])
  const [errorMessageOpen, setErrorMessageOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<any>(null)
  const auth = useAuth()
  const router = useRouter()
  let calledEffect: boolean = false

  const handleDeleteGame = async (gameId: string) => {
    try {
      await deleteGame(gameId)
      router.reload()
    } catch (e: any) {
      console.log(e.message)
      setErrorMessage(e?.message)
      setErrorMessageOpen(true)
    }
  }

  const GameOptionsModel = (props: any) => (
    <Styles.DialogRoot>
      <Styles.DialogTrigger>
        <Icon name="threeDots" size={18} />
      </Styles.DialogTrigger>
      <Styles.DialogPortal>
        <Styles.DialogOverlay />
        <Styles.DialogContent>
          <Styles.DialogTitle>Delete Game</Styles.DialogTitle>
          <Styles.DialogDescription>
            Are you sure you want to delete this game?
          </Styles.DialogDescription>
          <Button fullWidth onClick={() => handleDeleteGame(props.gameId)}>Yes, delete!</Button>
          <Styles.DialogClose asChild>
            <Styles.IconButton aria-label="Close">
              <Cross2Icon />
            </Styles.IconButton>
          </Styles.DialogClose>
        </Styles.DialogContent>
      </Styles.DialogPortal>
    </Styles.DialogRoot>
  )

  const fetchData = useCallback(async () => {
    if (calledEffect !== true) {
      try {
        const gamesData = await getGames(auth.user?.uid as string)
        setGameData(gamesData)
      } catch (e: any) {
        console.log(e)
        setErrorMessage(e?.message)
        setErrorMessageOpen(true)
      }
    }
  }, [auth, calledEffect])

  useEffect(() => {
    if (auth.user) {
      fetchData()
      // make sure to catch any error
        .catch(console.error)

      calledEffect = true
    }
  }, [router, auth, calledEffect, fetchData, gameData])

  return (
    <Styles.Container>
      <Header title="Discovery" breadcrumbs={[{ title: 'Discovery', href: paths.games }, { title: 'Estimate', href: paths.games }, { title: 'Games', href: paths.games }]} />
      <Styles.Main>
        <Styles.Section>
          <Container>
            {(!auth?.user && (
              <LoadingSkeleton />
            )) || (
              <>
                <Styles.Box>
                  <Flex gap="3" align="center">
                    <h3>My Planning Poker Games</h3>
                    {!auth?.user?.isAnonymous && (
                      <Box justifyContent="flex-end" flex={1}>
                        <Flex gap="3" align="center">
                          <Button onClick={() => router.push(paths.newGame)}>Create Game</Button>
                        </Flex>
                      </Box>
                    )}
                  </Flex>
                  <Styles.SeparatorRoot css={{ margin: '15px 0' }} />
                  {gameData.length === 0 && (
                    <Typography>No games found.</Typography>
                  )}
                  {gameData && gameData.map((game: any, i: number) => (
                    <Card style={{ marginBottom: '10px' }} key={i}>
                      <Flex gap="3" align="center">
                        <Link href={resolvePath(paths.game, { id: game.id })}>
                          <Flex gap="3" align="center">
                            <Avatar
                              src=""
                              alt={game?.name}
                            />
                            <Typography>{game?.name}</Typography>
                          </Flex>
                        </Link>
                        <Box>
                          <Styles.ShowText as="div" size="2" weight="bold">
                            {game?.players.length} x players in game
                          </Styles.ShowText>
                        </Box>
                        <Box justifyContent="flex-end" flex={1}>
                          <ButtonIcon label="open game" icon={{ name: 'eye', color: 'background', size: 18 }} onClick={() => router.push(resolvePath(paths.game, { id: game.id }))} />
                          {!auth?.user?.isAnonymous && (
                            <GameOptionsModel gameId={game?.id} />
                          )}
                        </Box>
                      </Flex>
                    </Card>
                  ))}
                </Styles.Box>
              </>
            )}
          </Container>
        </Styles.Section>
        <Toast open={errorMessageOpen} setOpenState={setErrorMessageOpen} title="Oops! An error occurred" description={errorMessage} />
      </Styles.Main>
    </Styles.Container>
  )
}
