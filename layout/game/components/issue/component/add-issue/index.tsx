import { Box, Button, TextArea } from 'components/common'
import { useGame } from 'context/game'
import { createIssue } from 'lib/firestore'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Styles from './styles'
import { AddIssueProps, IssueFormData } from './types'

export function AddIssue (props: AddIssueProps) {
  const {
    game
  } = useGame()

  const {
    register,
    handleSubmit,
    reset
  } = useForm<IssueFormData>()

  const [isEdditing, setIsEditting] = useState(false)

  const renderForm = () => {
    if (!isEdditing) {
      return (
        <Button
          type="button"
          fullWidth
          onClick={() => setIsEditting(true)}
        >Add an issue / story</Button>
      )
    }

    const onSubmit = async (data: IssueFormData) => {
      if (!game) return

      await createIssue(game.id, {
        value: data.value
      })

      setIsEditting(false)
      reset()
    }

    return (
      <Styles.Form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          name="value"
          register={register('value')}
          autoFocus
          placeholder="Enter a title for this issue"
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
