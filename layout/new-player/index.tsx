import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, SignIn } from 'components/common'
import { Input } from 'components/common/input'
import * as Styles from './styles'
import type { PlayerRegisterFormData } from '../game/components/player-register/types'
import { playerRegisterValidations } from '../game/components/player-register/validations'
import { createPlayer } from 'lib/firestore'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from 'context/auth'
import { paths } from 'constants/theme/routes'
import { resolvePath } from 'utils/helpers'
import { Roles, Subscription } from 'lib/firestore/types'
import { logEvent } from 'lib/analytics'
import { ANALYTICS_EVENTS } from 'constants/analytics'

export function NewPlayerLayout () {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)
  const signInAnonymouslyEnabled = process.env.ANONYMOUS_SIGNIN_ENABLED || null
  const whitelabel = process.env.WHITELABEL || null

  const router = useRouter()
  const auth = useAuth()

  const { id } = router.query

  useEffect(() => {
    if (auth?.isSigned) setIsAuthLoaded(true)
  }, [auth])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PlayerRegisterFormData>({
    resolver: yupResolver(playerRegisterValidations)
  })

  const goToGame = () => {
    window.location.href = resolvePath(paths.game, { id })
  }

  const onSubmit = async (data: PlayerRegisterFormData) => {
    try {
      setIsLoading(true)

      if (!isAuthLoaded && signInAnonymouslyEnabled) {
        const anonymousUser = await auth.signInAnonymously()
        try {
          await createPlayer(id as string, {
            id: anonymousUser?.user?.uid,
            name: data.name,
            isAnonymous: true,
            role: Roles.player,
            type: Subscription.free
          })

          logEvent(ANALYTICS_EVENTS.PLAYER_JOIN, {
            id,
            uid: anonymousUser.user.uid
          })
        } catch (e: any) {
          console.error(e)
          console.log('FAILED TO CREATE NEW PLAYER')
        }
      } else {
        try {
          await createPlayer(id as string, {
            id: auth.user?.uid || (Math.random() + 1).toString(36).substring(12),
            name: data.name,
            isAnonymous: true,
            role: Roles.player,
            type: whitelabel ? Subscription.enterprise : Subscription.free
          })

          logEvent(ANALYTICS_EVENTS.PLAYER_JOIN, {
            id,
            uid: auth?.user?.uid || (Math.random() + 1).toString(36).substring(12)
          })
        } catch (e: any) {
          console.error(e)
          console.log('FAILED TO UPDATE PLAYER FOR GAME')
        }
      }
      setIsAuthLoaded(false)
    } finally {
      setIsLoading(false)
      goToGame()
    }
  }

  return (
    <Styles.Main>
      <Styles.Content>
        <Styles.LogoContainer>
          <Link href={paths.home}>
            {(whitelabel && (
              <Image src={`/whitelabel/${whitelabel}.png`} alt={whitelabel} width="0" height="0" sizes="100vw" style={{ width: 'auto', height: '30px' }} priority={true} />
            )) || (
              <h2>AgileLead. </h2>
            )}
          </Link>
        </Styles.LogoContainer>
        <Styles.Form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ textAlign: 'center' }}
          >Choose your display name.</div>
          <Box flexDirection="column" gap={0.5} marginTop={2}>
            <Input
              id="name"
              register={register('name')}
              errorMessage={errors?.name?.message}
              label="your display name"
              defaultValue={auth?.user?.displayName || ''}
            />
          </Box>
          {(!isAuthLoaded && (
            <>
              <Box marginTop={2}>
                {signInAnonymouslyEnabled && (
                  <Button variant="letter" disabled={isLoading} fullWidth>Anonymous Sign In</Button>
                )}
              </Box>
              {signInAnonymouslyEnabled && (
                <>
                  <Box marginTop={2}>
                    <Styles.SeparatorRoot decorative />
                  </Box>
                  <Styles.Small>
                    or, sign in below for more features
                  </Styles.Small>
                </>
              )}
              <Box marginTop={signInAnonymouslyEnabled ? 2 : 0}>
                <SignIn variant="primary" fullWidth />
              </Box>
            </>
          )) || (
            <Box marginTop={2}>
              <Button disabled={isLoading} fullWidth>Go to game</Button>
            </Box>
          )}
        </Styles.Form>
      </Styles.Content>
    </Styles.Main>
  )
}
