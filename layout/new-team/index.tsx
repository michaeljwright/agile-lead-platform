import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { Box, Button, Typography, LoadingSkeleton } from 'components/common'
import { Input } from 'components/common/input'
import * as Styles from './styles'
import { newTeamSchemaValidation } from './validations'
import type { NewTeamFormData } from './types'
import { paths } from 'constants/theme/routes'
import { getOrgs, createOrg, createTeam } from 'lib/firestore'
import { resolvePath } from 'utils/helpers'
import { useState } from 'react'
import { useAuth } from 'context/auth'
import { Roles, Subscription } from 'lib/firestore/types'
import { logEvent } from 'lib/analytics'
import { ANALYTICS_EVENTS } from 'constants/analytics'

export function NewTeamLayout () {
  const auth = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const whitelabel = process.env.WHITELABEL || null

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewTeamFormData>({
    resolver: yupResolver(newTeamSchemaValidation)
  })

  const onSubmit = async (payload: NewTeamFormData) => {
    setIsLoading(true)

    if (auth?.isSigned && auth?.user && !auth?.user?.isAnonymous) {
      let orgId = null
      const userOrgs = await getOrgs(auth?.user?.uid)

      if (userOrgs && userOrgs.length) {
        orgId = userOrgs[0]
      } else {
        const org = await createOrg(auth?.user?.uid, {
          isActive: true,
          type: whitelabel ? Subscription.enterprise : Subscription.free,
          admins: [auth?.user?.uid]
        })
        orgId = org.id
      }

      const creator = {
        id: auth.user.uid,
        name: auth.user?.displayName || '',
        email: auth.user?.email || '',
        photoURL: auth.user?.photoURL || '',
        isAnonymous: auth.user?.isAnonymous,
        role: Roles.admin,
        type: whitelabel ? Subscription.enterprise : Subscription.free,
        orgId
      }

      const team = await createTeam({ ...payload, creator, orgId })

      logEvent(ANALYTICS_EVENTS.CREATE_TEAM, {
        id: team?.id,
        uid: auth?.user?.uid
      })

      router.push(resolvePath(paths.sprints, { id: team.id }))
    }
  }

  return (
    <Styles.Main>
      <Styles.Content>
        {(!auth?.user && (
          <LoadingSkeleton />
        )) || (
          <>
            <Box marginBottom={20}>
              <Button
                onClick={() => router.push(paths.teams)}
                type="button"
                variant="letter"
                icon={{
                  name: 'arrowBackward'
                }}
              >
              Teams
              </Button>
            </Box>
            <Styles.Form onSubmit={handleSubmit(onSubmit)}>
              <Typography
                color="heading"
                size="sm"
              >Choose a name for your team (then create some sprints goals).</Typography>
              <Box flexDirection="column" gap={0.5} marginTop={2}>
                <Input
                  label="Team's name"
                  name="name"
                  id="name"
                  register={register('name')}
                  errorMessage={errors?.name?.message}
                  maxLength={50}
                />
              </Box>
              <Box marginTop={2}>
                <Button disabled={isLoading || auth?.user?.isAnonymous} fullWidth>Create Team</Button>
              </Box>
            </Styles.Form>
          </>
        )}
      </Styles.Content>
    </Styles.Main>
  )
}
