import {
  Box,
  Icon,
  Typography
} from 'components/common'
import { AddGoal, GoalItem } from './component'
import * as Styles from './styles'
import { useSprint } from 'context/sprint'
import { GoalProps } from './types'

export function Goals (props: GoalProps) {
  const {
    sprint,
    onRemoveGoal
  } = useSprint()

  const renderGoals = sprint?.goals && sprint?.goals.map(goal =>
    <li key={`goal-item-${goal.id}`}>
      <GoalItem
        name={goal?.name || ''}
        onDelete={() => onRemoveGoal(goal.id)}
      />
    </li>
  )

  const renderGoalInfo = () => {
    if (sprint?.goals?.length === 0) return null

    return (
      <Box gap={1} marginTop={1}>
        <Typography>{`${sprint?.goals?.length} x sprint goals`}</Typography>
      </Box>
    )
  }

  return (
    <Styles.Root open={props.goalOpen}>
      <Styles.Portal>
        <Styles.Overlay onClick={() => props.setGoalOpen(false)} />
        <Styles.Content>
          <Box fullWidth justifyContent="space-between" alignItems="center">
            <Typography as="strong" color="heading" size="md" fontWeight="400">Sprint Goals</Typography>
            <a onClick={() => props.setGoalOpen(false)}>
              <Icon name="close" />
            </a>
          </Box>
          {renderGoalInfo()}
          <Styles.List>
            {renderGoals}
          </Styles.List>
          <AddGoal />
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}
