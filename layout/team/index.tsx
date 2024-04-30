import {
  useEffect,
  useCallback,
  useState,
  useRef
} from 'react'
import { getTeam, getSprints, getTeamUsers, updateTeamStatus, deleteSprint } from 'lib/firestore'
import { useAuth } from 'context/auth'
import { formatDate } from 'lib/common'
import { Card, Flex } from '@radix-ui/themes'
import { Button, ButtonIcon, Box, Icon, Container, Header, Typography, LoadingSkeleton, Toast } from 'components/common'
import { Avatar } from 'layout/game/components'
import * as Styles from './styles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { resolvePath } from 'utils/helpers'
import { paths } from 'constants/theme/routes'
import { NewSprint } from './components/new-sprint'
import { InviteUser } from './components/invite-user'
import { Cross2Icon } from '@radix-ui/react-icons'

export function TeamLayout () {
  const [teamData, setTeamData] = useState<any>({})
  const calledEffect = useRef<boolean>(false)
  const [indicatorActive, setIndicatorActive] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [errorMessageOpen, setErrorMessageOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const auth = useAuth()
  const router = useRouter()

  const { teamId } = router.query

  const handleDeleteSprint = async (sprint: any) => {
    if (isAdmin) {
      try {
        await deleteSprint(sprint?.teamId, sprint?.id)
        router.reload()
      } catch (e: any) {
        console.log(e.message)
        setErrorMessage(e?.message)
        setErrorMessageOpen(true)
      }
    } else {
      setErrorMessage('Sorry, you need to be an admin to delete this sprint.')
      setErrorMessageOpen(true)
    }
  }

  const SprintOptionsModel = (props: any) => (
    <Styles.DialogRoot>
      <Styles.DialogTrigger>
        <Icon name="threeDots" size={18} />
      </Styles.DialogTrigger>
      <Styles.DialogPortal>
        <Styles.DialogOverlay />
        <Styles.DialogContent>
          <Styles.DialogTitle>Delete Sprint</Styles.DialogTitle>
          <Styles.DialogDescription>
            Are you sure you want to delete this sprint?
          </Styles.DialogDescription>
          <Button fullWidth onClick={() => handleDeleteSprint(props.sprint)}>Yes, delete!</Button>
          <Styles.DialogClose asChild>
            <Styles.IconButton aria-label="Close">
              <Cross2Icon />
            </Styles.IconButton>
          </Styles.DialogClose>
        </Styles.DialogContent>
      </Styles.DialogPortal>
    </Styles.DialogRoot>
  )

  const handleIndicatorChange = async () => {
    if (isAdmin) {
      let isActive = indicatorActive
      if (indicatorActive) {
        isActive = false
        setIndicatorActive(false)
      } else {
        isActive = true
        setIndicatorActive(true)
      }

      try {
        await updateTeamStatus(teamId as string, isActive)
      } catch (e: any) {
        console.log(e)
        setErrorMessage(e?.message)
        setErrorMessageOpen(true)
      }
    } else {
      setErrorMessage('Sorry, you need to be an admin to disable this team.')
      setErrorMessageOpen(true)
    }
  }

  const fetchData = useCallback(async (teamId: any) => {
    if (calledEffect.current !== true) {
      try {
        const team = await getTeam(teamId)
        const sprints = await getSprints(teamId)
        const users = await getTeamUsers(teamId)
        const teamData = { ...team, ...{ sprints: sprints || [] }, ...{ users: users || [] } }
        setTeamData(teamData)
        setIsAdmin(auth.isContextualAdmin(teamData?.users, teamData?.creator))
      } catch (e: any) {
        console.log(e)
        setErrorMessage(e?.message)
        setErrorMessageOpen(true)
      }
    }
  }, [calledEffect, auth])

  useEffect(() => {
    setIndicatorActive(teamData.isActive)
    if (auth?.user && teamId) {
      fetchData(teamId)
      // make sure to catch any error
        .catch(console.error)

      calledEffect.current = true
    }
  }, [auth, calledEffect, fetchData, teamData])

  return (
    <Styles.Container>
      <Header title="Goals" breadcrumbs={[{ title: 'Delivery', href: paths.teams }, { title: 'Teams', href: paths.teams }, { title: 'Team', href: '#' }]} />
      <Styles.Main>
        <Styles.Section>
          <Container>
            {((!auth?.user || auth?.user.isAnonymous) && (
              <LoadingSkeleton />
            )) || (
              <Styles.Box>
                <Flex gap="3" align="center">
                  <h3>Team { teamData.name || 'Unknown' }</h3>
                  <Styles.SwitchRoot defaultChecked={indicatorActive} checked={indicatorActive} id="active-mode" onCheckedChange={handleIndicatorChange}>
                    <Styles.SwitchThumb />
                  </Styles.SwitchRoot> <Styles.Indicator>{ indicatorActive ? 'Active' : 'Disabled' }</Styles.Indicator>
                </Flex>
                <Styles.SeparatorRoot css={{ margin: '15px 0' }} />
                <Flex gap="3" align="center">
                  <h4>Sprints</h4>
                  {teamData?.sprints?.length === 0 && (
                    <Typography>No sprints found.</Typography>
                  )}
                  <Box justifyContent="flex-end" flex={1}>
                    <Flex gap="3" align="center" style={{ marginBottom: '15px' }}>
                      {isAdmin && (
                        <NewSprint />
                      )}
                    </Flex>
                  </Box>
                </Flex>
                {teamData?.sprints && teamData?.sprints.map((sprint: any, i: number) => (
                  <Card style={{ marginBottom: '10px' }} key={i}>
                    <Flex gap="3" align="center">
                      <Link href={resolvePath(paths.sprint, { id: teamData.id, sprintId: sprint.id })}>
                        <Flex gap="3" align="center">
                          <Avatar
                            src=""
                            alt={sprint?.name}
                            disabled={!sprint?.isActive}
                          />
                          <Typography>{sprint?.name}</Typography>
                        </Flex>
                      </Link>
                      <Box>
                        {(sprint?.isActive && (
                          <Styles.ShowText as="div" size="2" weight="bold">
                            {sprint?.goals?.length || 0} x goals and {sprint?.waste?.length || 0} x waste for this sprint <br />
                            {formatDate(sprint?.startAt) || 'Not set'} to {formatDate(sprint?.endAt) || 'Not set'}
                          </Styles.ShowText>
                        )) || (
                          <Styles.ShowText as="div" size="2" weight="bold">
                            Disabled / Not Active <br />
                            {formatDate(sprint?.startAt) || 'Not set'} to {formatDate(sprint?.endAt) || 'Not set'}
                          </Styles.ShowText>
                        )}
                      </Box>
                      <Box justifyContent="flex-end" flex={1}>
                        <ButtonIcon label="open sprint" icon={{ name: 'eye', color: 'background', size: 18 }} onClick={() => router.push(resolvePath(paths.sprint, { id: sprint.id }))} />
                        {auth.isContextualAdmin(sprint?.users, sprint?.creator) && (
                          <SprintOptionsModel sprint={sprint} />
                        )}
                      </Box>
                    </Flex>
                  </Card>
                ))}
                <Styles.SeparatorRoot />
                <Flex gap="3" align="center">
                  <h4>Users</h4>
                  {teamData?.users?.length === 0 && (
                    <Typography>No users found.</Typography>
                  )}
                  <Box justifyContent="flex-end" flex={1}>
                    <Flex gap="3" align="center" style={{ marginBottom: '15px' }}>
                      {isAdmin && (
                        <>
                          {/* <Button variant="letter">Manage Invites</Button> */}
                          <InviteUser />
                        </>
                      )}
                    </Flex>
                  </Box>
                </Flex>
                {teamData?.users && teamData?.users.map((user: any, i: number) => (
                  <Card style={{ marginBottom: '10px' }} key={i}>
                    <Flex gap="3" align="center">
                      <Flex gap="3" align="center">
                        <Avatar
                          src={ user?.photoURL || ''}
                          alt={ user?.name || 'Anonymous' }
                        />
                        <Typography>{ user?.name || 'Anonymous' }</Typography>
                      </Flex>
                      <Box>
                        <Styles.HiddenText as="div" size="2" weight="bold">
                          ({ user?.email || 'No email provided'})
                        </Styles.HiddenText>
                      </Box>
                      <Box justifyContent="flex-end" flex={1}>
                        {user?.email === teamData?.creator?.email && (
                          <Styles.CustomBadge>Creator</Styles.CustomBadge>
                        )}
                        {(user?.role === 'admin' && (
                          <Styles.CustomBadge>Admin</Styles.CustomBadge>
                        )) || (
                          <Styles.CustomBadge>Team Member</Styles.CustomBadge>
                        )}
                      </Box>
                    </Flex>
                  </Card>
                ))}
              </Styles.Box>
            )}
          </Container>
        </Styles.Section>
        <Toast open={errorMessageOpen} setOpenState={setErrorMessageOpen} title="Oops, something went wrong!" description={errorMessage || 'Looks like an error occurred which has been reported automatically and is being reviewed.'} />
      </Styles.Main>
    </Styles.Container>
  )
}
