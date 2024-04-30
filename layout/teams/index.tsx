import {
  useEffect,
  useCallback,
  useState
} from 'react'
import { getTeams, deleteTeam } from 'lib/firestore'
import { useAuth } from 'context/auth'
import { Card, Flex, Text } from '@radix-ui/themes'
import { Avatar } from 'layout/game/components'
import { Button, Box, ButtonIcon, Icon, Container, Typography, Header, LoadingSkeleton, Toast } from 'components/common'
import * as Styles from './styles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { resolvePath } from 'utils/helpers'
import { paths } from 'constants/theme/routes'
import { Cross2Icon } from '@radix-ui/react-icons'

export function TeamsLayout () {
  const [teamsData, setTeamsData] = useState<any>([])
  const [errorMessageOpen, setErrorMessageOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<any>(null)
  const auth = useAuth()
  const router = useRouter()
  let calledEffect: boolean = false

  const handleDeleteTeam = async (team: any) => {
    if (auth.isContextualAdmin(team?.users, team?.creator)) {
      try {
        await deleteTeam(team?.id)
        router.reload()
      } catch (e: any) {
        console.log(e.message)
        setErrorMessage(e?.message)
        setErrorMessageOpen(true)
      }
    } else {
      setErrorMessage('Sorry, you need to be an admin to delete this team.')
      setErrorMessageOpen(true)
    }
  }

  const TeamOptionsModel = (props: any) => (
    <Styles.DialogRoot>
      <Styles.DialogTrigger>
        <Icon name="threeDots" size={18} />
      </Styles.DialogTrigger>
      <Styles.DialogPortal>
        <Styles.DialogOverlay />
        <Styles.DialogContent>
          <Styles.DialogTitle>Delete Team</Styles.DialogTitle>
          <Styles.DialogDescription>
            Are you sure you want to delete this team?
          </Styles.DialogDescription>
          <Button fullWidth onClick={() => handleDeleteTeam(props.team)}>Yes, delete!</Button>
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
        const teamsData = await getTeams(auth.user?.uid as string)
        setTeamsData(teamsData)
      } catch (e: any) {
        console.error(e)
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
  }, [router, auth, calledEffect, fetchData, teamsData])

  return (
    <Styles.Container>
      <Header title="Goals" breadcrumbs={[{ title: 'Delivery', href: paths.teams }, { title: 'Teams', href: paths.teams }]} />
      <Styles.Main>
        <Styles.Section>
          <Container>
            {(!auth?.user && (
              <LoadingSkeleton />
            )) || (
              <Styles.Box>
                <Flex gap="3" align="center">
                  <h3>My Teams</h3>
                  {!auth?.user?.isAnonymous && (
                    <Box justifyContent="flex-end" flex={1}>
                      <Flex gap="3" align="center">
                        <Link href={paths.newTeam}><Button>Create Team</Button></Link>
                      </Flex>
                    </Box>
                  )}
                </Flex>
                <Styles.SeparatorRoot css={{ margin: '15px 0' }} />
                {(!auth?.user || teamsData?.length === 0) && (
                  <Text>No teams found. {!auth?.user?.isAnonymous && (<Link href={paths.newTeam}>Create new team</Link>)}</Text>
                )}
                {teamsData && teamsData.map((team: any, i: number) => (
                  <Card style={{ marginBottom: '10px' }} key={i}>
                    <Flex gap="3" align="center">
                      <Link href={resolvePath(paths.sprints, { id: team.id })}>
                        <Flex gap="3" align="center">
                          <Avatar
                            src=""
                            alt={team?.name}
                            disabled={!team?.isActive}
                          />
                          <Typography>{team?.name}</Typography>
                        </Flex>
                      </Link>
                      <Box>
                        {(team?.isActive && (
                          <Styles.ShowText as="div" size="2" weight="bold">
                            {team?.users || 0} x users and {team?.sprints || 0} x sprints in team
                          </Styles.ShowText>
                        )) || (
                          <Styles.ShowText as="div" size="2" weight="bold">Disabled / Not Active</Styles.ShowText>
                        )}
                      </Box>
                      <Box justifyContent="flex-end" flex={1}>
                        <ButtonIcon label="open team" icon={{ name: 'eye', color: 'background', size: 18 }} onClick={() => router.push(resolvePath(paths.sprints, { id: team.id }))} />
                        {auth.isContextualAdmin([], team?.creator) && (
                          <TeamOptionsModel team={team} />
                        )}
                      </Box>
                    </Flex>
                  </Card>
                ))}
              </Styles.Box>
            )}
          </Container>
        </Styles.Section>
        <Toast open={errorMessageOpen} setOpenState={setErrorMessageOpen} title="Oops! An error occurred" description={errorMessage} />
      </Styles.Main>
    </Styles.Container>
  )
}
