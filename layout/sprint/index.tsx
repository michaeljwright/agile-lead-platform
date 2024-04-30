import {
  useEffect,
  useState
} from 'react'
import { updateSprintStatus } from 'lib/firestore'
import { formatDate, capitalizeFirstLetter } from 'lib/common'
import { useAuth } from 'context/auth'
import { useSprint } from 'context/sprint'
import { Card, Flex } from '@radix-ui/themes'
import { ButtonIcon, Box, Icon, Container, Header, Typography, LoadingSkeleton, Toast } from 'components/common'
import { Avatar } from 'layout/game/components'
import * as Styles from './styles'
import { resolvePath } from 'utils/helpers'
import { paths } from 'constants/theme/routes'
import Draggable from 'react-draggable'
import { WasteTrigger } from './components/waste/component'
import { Waste } from './components/waste'
import { GoalTrigger } from './components/goals/component'
import { Goals } from './components/goals'
import { Cross2Icon } from '@radix-ui/react-icons'
import { DeltaPosition } from './types'

export function SprintLayout () {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [wasteOpen, setWasteOpen] = useState<boolean>(false)
  const [goalOpen, setGoalOpen] = useState<boolean>(false)
  const [errorMessageOpen, setErrorMessageOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [indicatorActive, setIndicatorActive] = useState<boolean>(false)
  const [activeDrags, setActiveDrags] = useState<number>(0)
  const [currentWaste, setCurrentWaste] = useState<object>({})
  const [deltaPosition, setDeltaPosition] = useState<DeltaPosition>({ x: 0, y: 0 })
  const auth = useAuth()

  const {
    sprint,
    isLoaded,
    updateWaste,
    onRemoveWaste
  } = useSprint()

  const handleIndicatorChange = async () => {
    let isActive = indicatorActive
    if (indicatorActive) {
      isActive = false
      setIndicatorActive(false)
    } else {
      isActive = true
      setIndicatorActive(true)
    }

    try {
      await updateSprintStatus(sprint?.teamId as string, sprint?.id as string, isActive)
    } catch (e: any) {
      console.log(e)
      setErrorMessage(e?.message)
      setErrorMessageOpen(true)
    }
  }

  const dragHandlers = {
    onStart: () => setActiveDrags(activeDrags + 1),
    onStop: () => {
      setActiveDrags(activeDrags - 1)
      setCurrentWaste(deltaPosition)
    }
  }

  const handleDrag = (e: any, ui: any) => {
    const wasteId = e.srcElement.offsetParent.className?.split('waste-item-').pop().split(' ')[0]
    const wasteData = sprint?.waste?.at(wasteId)

    setDeltaPosition({
      ...wasteData,
      x: ui.x + ui.deltaX,
      y: ui.y + ui.deltaY
    })
  }

  const OptionsModel = () => (
    <Styles.DialogRoot>
      <Styles.DialogTrigger>
        <Icon name="threeDots" size={18} />
      </Styles.DialogTrigger>
      <Styles.DialogPortal>
        <Styles.DialogOverlay />
        <Styles.DialogContent>
          <Styles.DialogTitle>Options</Styles.DialogTitle>
          <Styles.DialogDescription>
            We will be adding other Sprint Goal functionality. Check back soon.
          </Styles.DialogDescription>
          <Styles.DialogClose asChild>
            <Styles.IconButton aria-label="Close">
              <Cross2Icon />
            </Styles.IconButton>
          </Styles.DialogClose>
        </Styles.DialogContent>
      </Styles.DialogPortal>
    </Styles.DialogRoot>
  )

  useEffect(() => {
    if (deltaPosition?.id) {
      updateWaste(deltaPosition)
    }
  }, [currentWaste])

  useEffect(() => {
    if (isLoaded) {
      setLoaded(true)
      setIndicatorActive(sprint?.isActive || false)
    }
  }, [isLoaded, sprint])

  return (
    <Styles.Container>
      <Header title="Goals" breadcrumbs={[{ title: 'Delivery', href: paths.teams }, { title: 'Teams', href: paths.teams }, { title: 'Team', href: resolvePath(paths.sprints, { id: sprint?.teamId }) }, { title: 'Sprint', href: '#' }]} />
      <Styles.Main>
        <Styles.Section>
          <Container>
            {(!loaded && !auth?.user && (
              <LoadingSkeleton />
            )) || (
              <Styles.Box>
                <Flex gap="3" align="center">
                  <h3>Sprint: { capitalizeFirstLetter(sprint?.name) }</h3>
                  <Styles.SwitchRoot defaultChecked={indicatorActive} checked={indicatorActive} id="active-mode" onCheckedChange={handleIndicatorChange}>
                    <Styles.SwitchThumb />
                  </Styles.SwitchRoot> <Styles.Indicator>{ indicatorActive ? 'Active' : 'Disabled' }</Styles.Indicator>
                  <Box justifyContent="flex-end" flex={1}>
                    <Flex gap="3" align="center">
                      <strong>Start: </strong> {formatDate(sprint?.startAt) || 'Not set'} <strong>End: </strong> {formatDate(sprint?.endAt) || 'Not set'}
                    </Flex>
                  </Box>
                </Flex>
                <Styles.SeparatorRoot css={{ margin: '15px 0' }} />
                <Flex gap="3" align="center">
                  <h4>Goals</h4>
                  {sprint?.goals?.length === 0 && (
                    <Typography>No sprint goals found.</Typography>
                  )}
                  <Box justifyContent="flex-end" flex={1}>
                    <Flex gap="3" align="center" style={{ marginBottom: '15px' }}>
                      <GoalTrigger variant="button" setGoalOpen={setGoalOpen} onclick={() => setGoalOpen(true)} />
                    </Flex>
                  </Box>
                </Flex>
                {sprint?.goals && sprint?.goals.map((goal: any, i: number) => (
                  <Card style={{ marginBottom: '10px' }} key={i}>
                    <Flex gap="3" align="center">
                      <Flex gap="3" align="center">
                        <Avatar
                          src=""
                          alt={goal?.name}
                        />
                        <Typography>{goal?.name}</Typography>
                      </Flex>
                      <Box justifyContent="flex-end" flex={1}>
                        <OptionsModel />
                      </Box>
                    </Flex>
                  </Card>
                ))}
                <Styles.SeparatorRoot />
                <Flex gap="3" align="center">
                  <h4>Waste Snake</h4>
                  {sprint?.waste?.length === 0 && (
                    <Typography>No waste found.</Typography>
                  )}
                  <Box justifyContent="flex-end" flex={1}>
                    <Flex gap="3" align="center" style={{ marginBottom: '15px' }}>
                      <WasteTrigger variant="button" setWasteOpen={setWasteOpen} onclick={() => setWasteOpen(true)} />
                    </Flex>
                  </Box>
                </Flex>
                <Styles.WasteCard>
                  <Styles.WasteContainer>
                    {sprint?.waste && sprint?.waste.map((waste: any, i: number) => (
                      <Draggable defaultClassName={`waste-item-${i}`} key={`waste-item-${i}`} defaultPosition={{ x: waste?.x || 250 + (i * 10), y: waste?.y || 250 }} onDrag={handleDrag} {...dragHandlers}>
                        <Styles.WasteItem className="box">
                          <Styles.WasteItemClose><ButtonIcon label="close" icon={{ name: 'close', color: 'background', size: 12 }} onClick={() => onRemoveWaste(waste.id)} /></Styles.WasteItemClose>
                          <Styles.WasteItemText key={`waste-item-${i}`}>{waste?.name}</Styles.WasteItemText>
                        </Styles.WasteItem>
                      </Draggable>
                    ))}
                  </Styles.WasteContainer>
                </Styles.WasteCard>
              </Styles.Box>
            )}
          </Container>
        </Styles.Section>
        <Waste wasteOpen={wasteOpen} setWasteOpen={setWasteOpen} />
        <Goals goalOpen={goalOpen} setGoalOpen={setGoalOpen} />
        <Toast open={errorMessageOpen} setOpenState={setErrorMessageOpen} title="Oops, something went wrong!" description={errorMessage || 'Looks like an error occurred which has been reported automatically and is being reviewed.'} />
      </Styles.Main>
    </Styles.Container>
  )
}
