import { Box, Button, TextArea } from 'components/common'
import { useSprint } from 'context/sprint'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Styles from './styles'
import { AddGoalProps, GoalFormData } from './types'

export function AddGoal (props: AddGoalProps) {
  const {
    sprint,
    createGoal
  } = useSprint()

  const {
    register,
    handleSubmit,
    reset
  } = useForm<GoalFormData>()

  const [isEdditing, setIsEditting] = useState(false)

  const renderForm = () => {
    if (!isEdditing) {
      return (
        <Button
          type="button"
          fullWidth
          onClick={() => setIsEditting(true)}
        >Add Goal</Button>
      )
    }

    const onSubmit = async (data: GoalFormData) => {
      if (!sprint?.id) return

      await createGoal({
        name: data.name
      })

      setIsEditting(false)
      reset()
    }

    return (
      <Styles.Form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          name="name"
          register={register('name')}
          autoFocus
          placeholder="Enter a description for the sprint goal"
        />
        <Box gap={0.5}>
          <Button
            type="button"
            fullWidth
            variant="letter"
            onClick={() => setIsEditting(false)}
          >Cancel</Button>
          <Button fullWidth>Save</Button>
        </Box>
      </Styles.Form>
    )
  }

  return (
    <Styles.Container>
      {renderForm()}
    </Styles.Container>
  )
}
