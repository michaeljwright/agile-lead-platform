import { useEffect, useState } from 'react'
import { Box, Button, ButtonIcon, Typography, Toast, Header, Icon } from 'components/common'
import { useGame } from 'context/game'
import { Avatar, Issue } from './components'
import * as Styles from './styles'
import { CardList } from './components/card-list'
import { CardReval } from './components/card-reveal'
import { IssueTrigger } from './components/issue/component'
import { resolvePath } from 'utils/helpers'
import { paths } from 'constants/theme/routes'
import { useRouter } from 'next/router'

export function GameLayout () {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [toastOpen, setToastOpen] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  const {
    game,
    player,
    onReveal,
    countDown,
    onRestart,
    activeIssue,
    isLoaded
  } = useGame()

  useEffect(() => {
    if (player?.role === 'admin') setIsAdmin(true)
    if (isLoaded) setLoaded(true)
  }, [isLoaded, router, player])

  const renderCurrentIssue = () => {
    if (!game?.activeIssue) return null

    return (
      <Box>
        <Styles.IssueLabel>{`Voting on ${activeIssue?.value}`}</Styles.IssueLabel>
      </Box>
    )
  }

  const renderParticipants = game?.players?.map(participant => {
    const isMe = player?.id === participant.id

    const name = isMe ? 'you' : participant.name

    return (
      <Box
        key={participant.id}
        flexDirection="column"
        gap={1}
      >
        <CardReval
          playerId={participant.id}
          isSpectator={participant?.isSpectator}
          isAdmin={isAdmin}
          isMe={isMe}
          label={participant.vote || ''}
        />
        <Styles.PlayerName me={isMe}>{name}</Styles.PlayerName>
      </Box>
    )
  })

  const renderReveal = () => {
    if (game?.isReveal) return null

    return (
      <Button onClick={onReveal}>
        show cards
      </Button>
    )
  }

  const renderCloseGame = () => {
    if (!game?.isReveal) return null

    return (
      <ButtonIcon label="close game" icon={{ name: 'close', color: 'background', size: 14 }} onClick={onRestart} />
    )
  }

  const renderCountDown = () => {
    if (game?.isPlaying || countDown === 0) return null

    return (
      <Styles.Count>{countDown}</Styles.Count>
    )
  }

  const renderPlayerAvatar = () => {
    if (!player) return null

    return (
      <Box gap={1} alignItems="center">
        <Avatar
          src=""
          alt={player?.name}
        />
        <Typography>{`# ${player.name} ${isAdmin ? '(Admin)' : ''}`}</Typography>
      </Box>
    )
  }

  const handleJoinGame = () => {
    const { id } = router.query
    router.push(resolvePath(paths.shareGame, { id }))
  }

  const handleShare = async () => {
    const fullUrl = `${window.location.origin}${resolvePath(paths.shareGame, { id: router.query.id })}`
    await navigator.clipboard.writeText(fullUrl)
    setToastOpen(true)
  }

  if (loaded) {
    return (
      <Styles.Container>
        <Header title="Discovery" breadcrumbs={[{ title: 'Discovery', href: paths.games }, { title: 'Estimate', href: paths.games }, { title: 'Games', href: paths.games }, { title: game?.name, href: '#' }]} setOpen={setOpen} />
        <Styles.Main>
          <Box flexDirection="column" gap={1}>
            <Box justifyContent="space-between">
              <Typography>
                {renderPlayerAvatar()}
                <br />
                {game?.name && <Styles.BoardName>{'Game: ' + game?.name} {renderCloseGame()}</Styles.BoardName>}
                {renderCurrentIssue()}
              </Typography>
              <Box flexDirection="column" gap={1}>
                <IssueTrigger variant="button" setOpen={setOpen} onclick={() => setOpen(true)} />
                <Button variant="letter" onClick={handleShare}>Share Game</Button>
                <Toast open={toastOpen} setOpenState={setToastOpen} title="Copied Game Address!" description="The address Url for this game has been copied to your clipboard." />
              </Box>
            </Box>
          </Box>
          <Box
            marginTop={3}
            alignItems="center"
            justifyContent="center"
            gap={2}
            flexDirection="column"
          >
            <Box fullWidth justifyContent="center" gap={1}>
              {renderParticipants}
            </Box>
            <Box justifyContent="center">
              {renderReveal()}
            </Box>
            <Box>
              {renderCountDown()}
            </Box>
          </Box>
          <Styles.Hand>
            <Box justifyContent="center">
              <Typography>Choose your card <Icon name="pointDown" size={18} /></Typography>
            </Box>
            <CardList />
          </Styles.Hand>
        </Styles.Main>
        <Issue open={open} setOpen={setOpen} />
      </Styles.Container>
    )
  } else {
    return (
      <Styles.Container>
        <Header title="Estimate" setOpen={setOpen} />
        <Styles.Main>
          <Box marginTop={2} justifyContent="center">
            <Typography>Looks like you might not have joined this game before.</Typography>
          </Box>
          <Box marginTop={2} justifyContent="center">
            <Button onClick={handleJoinGame}>Request to join</Button>
          </Box>
        </Styles.Main>
      </Styles.Container>
    )
  }
}
