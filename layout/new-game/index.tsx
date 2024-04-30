import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import router from 'next/router'
import { Box, Button, Typography, LoadingSkeleton } from 'components/common'
import { Input } from 'components/common/input'
import * as Styles from './styles'
import { newGameSchemaValidation } from './validations'
import type { NewGameFormData } from './types'
import { paths } from 'constants/theme/routes'
import { useGame } from 'context/game'
import { resolvePath } from 'utils/helpers'
import { useState } from 'react'
import { useAuth } from 'context/auth'
import { Roles, Subscription } from 'lib/firestore/types'
import { logEvent } from 'lib/analytics'
import { ANALYTICS_EVENTS } from 'constants/analytics'
import { getOrgs, createOrg } from 'lib/firestore'

export function NewGameLayout () {
  const auth = useAuth()
  const { createGame } = useGame()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const whitelabel = process.env.WHITELABEL || null

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewGameFormData>({
    resolver: yupResolver(newGameSchemaValidation)
  })

  const onSubmit = async (payload: NewGameFormData) => {
    setIsLoading(true)

    if (auth?.isSigned && auth.user && !auth?.user?.isAnonymous) {
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

      const players = {
        players: [{
          id: auth.user.uid,
          name: auth.user.displayName || '',
          isAnonymous: auth.user?.isAnonymous,
          role: Roles.admin,
          type: whitelabel ? Subscription.enterprise : Subscription.free,
          orgId
        }]
      }

      const creator = {
        id: auth.user.uid,
        name: auth.user.displayName || '',
        isAnonymous: auth.user?.isAnonymous,
        role: Roles.admin,
        type: whitelabel ? Subscription.enterprise : Subscription.free,
        orgId
      }

      const game = await createGame({ ...payload, ...players, orgId, creator })

      logEvent(ANALYTICS_EVENTS.PLAYER_JOIN, {
        id: game?.id,
        uid: auth.user.uid
      })

      router.push(resolvePath(paths.game, { id: game.id }))
    } else {
      setIsLoading(false)
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
                onClick={() => router.push(paths.games)}
                type="button"
                variant="letter"
                icon={{
                  name: 'arrowBackward'
                }}
              >
              Games
              </Button>
            </Box>
            <Styles.Form onSubmit={handleSubmit(onSubmit)}>
              <Typography
                color="heading"
                size="sm"
              >Choose a name for your game.</Typography>
              <Box flexDirection="column" gap={0.5} marginTop={2}>
                <Input
                  label="Game's name"
                  name="name"
                  id="name"
                  register={register('name')}
                  errorMessage={errors?.name?.message}
                  maxLength={50}
                />
              </Box>
              <Box marginTop={2}>
                <Button disabled={isLoading || auth?.user?.isAnonymous} fullWidth>Create game</Button>
              </Box>
            </Styles.Form>
          </>
        )}
      </Styles.Content>
    </Styles.Main>
  )
}
