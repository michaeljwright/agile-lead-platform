import { Button } from 'components/common'
import { GoalTriggerProps } from './types'

export const GoalTrigger = (props: GoalTriggerProps) => {
  const variantButton = props.variant || null

  return (
    <>
      {(!variantButton && (
        <a onClick={() => props.setGoalOpen(true)}>
          Manage Goals
        </a>
      )) || (
        <Button onClick={() => props.setGoalOpen(true)}>Manage Goals</Button>
      )}
    </>
  )
}
