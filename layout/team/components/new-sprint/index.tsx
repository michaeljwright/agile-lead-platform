import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { addWeeks } from 'date-fns'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from 'components/common'
import { Input } from 'components/common/input'
import * as Styles from './styles'
import type { NewSprintFormData, NewSprintProps } from './types'
import { newSprintValidations } from './validations'
import { useState } from 'react'
import { createSprint } from 'lib/firestore'
import { resolvePath } from 'utils/helpers'
import { paths } from 'constants/theme/routes'
import { useRouter } from 'next/router'
import { useAuth } from 'context/auth'
import { Roles } from 'lib/firestore/types'
import { Cross2Icon } from '@radix-ui/react-icons'
import 'react-datepicker/dist/react-datepicker.css'
import { logEvent } from 'lib/analytics'
import { ANALYTICS_EVENTS } from 'constants/analytics'

export function NewSprint (props: NewSprintProps) {
  const currentDate = new Date()
  const [isLoading, setIsLoading] = useState(false)
  const [startAt, setStartAt] = useState<Date>(currentDate)
  const [endAt, setEndAt] = useState<Date>(addWeeks(currentDate, 2))

  const router = useRouter()
  const { teamId } = router.query
  const auth = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewSprintFormData>({
    resolver: yupResolver(newSprintValidations)
  })

  const handleChangeStartDate = (date: any) => {
    setStartAt(date)
    setEndAt(addWeeks(date, 2))
  }

  const handleChangeEndDate = (date: any) => {
    setEndAt(date)
  }

  const onSubmit = async (payload: NewSprintFormData) => {
    setIsLoading(true)

    if (auth?.isSigned && auth.user) {
      const creator = {
        id: auth.user.uid,
        name: auth.user?.displayName || '',
        email: auth.user?.email || '',
        photoURL: auth.user?.photoURL || '',
        isAnonymous: auth.user?.isAnonymous,
        role: Roles.admin
      }

      const sprint = await createSprint(teamId as string, { startAt, endAt, ...payload, creator, isActive: true, isDeleted: false, goals: [], waste: [] })

      logEvent(ANALYTICS_EVENTS.CREATE_SPRINT, {
        id: sprint?.id,
        uid: auth.user.uid,
        teamId
      })

      setIsLoading(false)
      router.push(resolvePath(paths.sprint, { id: teamId, sprintId: sprint.id }))
    }
  }

  return (
    <Styles.DialogRoot>
      <Styles.DialogTrigger>
        Create Sprint
      </Styles.DialogTrigger>
      <Styles.DialogPortal>
        <Styles.DialogOverlay />
        <Styles.DialogContent>
          <Styles.DialogTitle>
            New Sprint
          </Styles.DialogTitle>
          <Styles.DialogDescription>
            Please enter the name of your sprint along with start and end dates. Then you can setup your sprint goals.
          </Styles.DialogDescription>
          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <Box flexDirection="column" gap={0.5} marginTop={2}>
              <Input
                id="name"
                register={register('name')}
                errorMessage={errors?.name?.message}
                label="Enter your sprint name"
              />
              <Box justifyContent="space-between" gap={1} marginBottom={15}>
                <Styles.PickerLabel htmlFor='startAt'>Start date
                  <DatePicker
                    name="startAt"
                    selected={startAt}
                    onSelect={handleChangeStartDate}
                    onChange={handleChangeStartDate}
                    className='picker'
                  />
                </Styles.PickerLabel>
                <Styles.PickerLabel htmlFor='endAt'>End date
                  <DatePicker
                    name="endAt"
                    selected={endAt}
                    onSelect={handleChangeEndDate}
                    onChange={handleChangeEndDate}
                    className='picker'
                  />
                </Styles.PickerLabel>
              </Box>
            </Box>
            <Button fullWidth disabled={isLoading}>Create Sprint</Button>
          </Styles.Form>
          <Styles.SeparatorRoot />
          <Styles.DialogClose asChild>
            <Styles.IconButton aria-label="Close">
              <Cross2Icon />
            </Styles.IconButton>
          </Styles.DialogClose>
        </Styles.DialogContent>
      </Styles.DialogPortal>
    </Styles.DialogRoot>
  )
}
