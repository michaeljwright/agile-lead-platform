import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Toast } from 'components/common'
import { Input } from 'components/common/input'
import * as Styles from './styles'
import type { InviteUserFormData, InviteUserProps } from './types'
import { inviteUserValidations } from './validations'
import { useState } from 'react'
import { inviteUser } from 'lib/firestore'
import { resolvePath } from 'utils/helpers'
import { paths } from 'constants/theme/routes'
import { useRouter } from 'next/router'
import { useAuth } from 'context/auth'
import { Cross2Icon } from '@radix-ui/react-icons'
import 'react-datepicker/dist/react-datepicker.css'
import { logEvent } from 'lib/analytics'
import { ANALYTICS_EVENTS } from 'constants/analytics'

export function InviteUser (props: InviteUserProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showInviteLink, setShowInviteLink] = useState<boolean>(false)
  const [copiedInviteLink, setCopiedInviteLink] = useState<boolean>(false)

  const router = useRouter()
  const { teamId } = router.query
  const auth = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InviteUserFormData>({
    resolver: yupResolver(inviteUserValidations)
  })

  const handleCopyInviteLink = async () => {
    const fullUrl = `${window.location.origin}${resolvePath(paths.inviteUser, { teamId, id: auth?.user?.uid })}`
    await navigator.clipboard.writeText(fullUrl)
    setCopiedInviteLink(true)
    setShowInviteLink(false)
  }

  const onSubmit = async (payload: InviteUserFormData) => {
    setIsLoading(true)

    const emails = payload?.email
      .split(/;|,/)
      .map((item) => item.replace(/[|&;$%"<>()+,]/g, ''))

    if (auth?.isSigned && auth.user) {
      setShowInviteLink(await inviteUser(auth.user.uid as string, teamId as string, { emails }))

      logEvent(ANALYTICS_EVENTS.INVITE_USER, {
        id: auth.user.uid
      })

      setIsLoading(false)
      router.push(resolvePath(paths.sprints, { id: teamId }))
    }
  }

  return (
    <Styles.DialogRoot>
      <Styles.DialogTrigger onClick={() => setShowInviteLink(false)}>
        Invite User
      </Styles.DialogTrigger>
      <Styles.DialogPortal>
        <Styles.DialogOverlay />
        <Styles.DialogContent>
          <Styles.DialogTitle>
            Invite User
          </Styles.DialogTitle>
          {(!showInviteLink && (
            <>
              <Styles.DialogDescription>
                Please enter the email of the user(s) you want to invite. You can add multiple emails separated with a comma.
              </Styles.DialogDescription>
              <Styles.Form onSubmit={handleSubmit(onSubmit)}>
                <Box flexDirection="column" gap={0.5} marginTop={2} marginBottom={15}>
                  <Input
                    id="email"
                    register={register('email')}
                    errorMessage={errors?.email?.message}
                    label="Enter email address"
                    maxLength={150}
                    {...register('email', {
                      required: 'Email is required',
                      validate: {
                        maxLength: (v) =>
                          v.length <= 50 || 'Each email should have at most 50 characters',
                        matchPattern: (v) =>
                          /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/.test(v) ||
                          'Each Email address must be a valid address'
                      }
                    })}
                  />
                </Box>
                <Button fullWidth disabled={isLoading}>Invite User</Button>
              </Styles.Form>
            </>
          )) || (
            <>
              <Styles.DialogDescription>
                Please share this link with the user(s) you have invited.
              </Styles.DialogDescription>
              <Box flexDirection="column" gap={0.5} marginTop={2}>
                <Styles.Share id="share">{`${window.location.origin}${resolvePath(paths.inviteUser, { teamId, id: auth?.user?.uid })}`}</Styles.Share>
              </Box>
              <Styles.SeparatorRoot />
              <Button fullWidth onClick={handleCopyInviteLink}>Copy Invite Link</Button>
              <Toast open={copiedInviteLink} setOpenState={setCopiedInviteLink} title="Copied Invite Link!" description="The Invite Link for this team has been copied to your clipboard." />
            </>
          )}
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
