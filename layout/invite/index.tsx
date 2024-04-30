import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Box, Button, LoadingSkeleton, Toast } from 'components/common'
import * as Styles from './styles'
import Image from 'next/image'
import Link from 'next/link'
import { paths } from 'constants/theme/routes'
import { acceptInvite } from 'lib/firestore'
import { resolvePath } from 'utils/helpers'
import { useAuth } from 'context/auth'
import { auth } from 'lib/firebase'
import { signOut } from 'firebase/auth'
import { Roles, Subscription, User } from 'lib/firestore/types'
import { logEvent } from 'lib/analytics'
import { ANALYTICS_EVENTS } from 'constants/analytics'

export function InviteLayout () {
  const authN = useAuth()
  const router = useRouter()
  const whitelabel = process.env.WHITELABEL || null
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessageOpen, setErrorMessageOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<any>(null)

  const { teamId, uid } = router.query
  const {
    handleSubmit
  } = useForm()

  const userSignOut = () => {
    signOut(auth)
  }

  const onSubmit = async () => {
    setIsLoading(true)

    if (authN?.isSigned && authN?.user && !authN?.user?.isAnonymous) {
      const user: User = {
        id: authN?.user?.uid,
        name: authN?.user?.displayName || '',
        email: authN?.user?.email || '',
        photoURL: authN?.user?.photoURL || '',
        isAnonymous: authN?.user?.isAnonymous,
        role: Roles.user,
        type: whitelabel ? Subscription.enterprise : Subscription.free
      }

      const accepted = await acceptInvite(uid as string, teamId as string, user)

      if (accepted) {
        console.log('issue occurred')
        setErrorMessage(accepted)
        setErrorMessageOpen(true)
      } else {
        logEvent(ANALYTICS_EVENTS.CREATE_TEAM, {
          id: authN?.user?.uid
        })
        router.push(resolvePath(paths.sprints, { id: teamId }))
      }
    } else {
      setErrorMessage('You cannot accept an invite as an Anonymous user. Please sign out first.')
      setErrorMessageOpen(true)
    }

    setIsLoading(false)
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
        {(!authN?.user && (
          <LoadingSkeleton auth={authN} showSignIn={true} customText="Please sign in to review this invite." />
        )) || (
          <>
            {(!authN?.user?.isAnonymous && (
              <Styles.Form onSubmit={handleSubmit(onSubmit)}>
                <Styles.Text>You have been invited to a team. Please click the button below to join.</Styles.Text>
                <Box marginTop={2}>
                  <Button disabled={isLoading} fullWidth>Accept Invite</Button>
                </Box>
              </Styles.Form>
            )) || (
              <Styles.Form>
                <Styles.Text>Looks like you need to sign out first as you are currently logged in as an Anonymous User.</Styles.Text>
                <Box marginTop={2}>
                  <Button fullWidth onClick={userSignOut}>Sign out</Button>
                </Box>
              </Styles.Form>
            )}
          </>
        )}
        <Toast open={errorMessageOpen} setOpenState={setErrorMessageOpen} title="Oops! An error occurred" description={errorMessage} />
      </Styles.Content>
    </Styles.Main>
  )
}
