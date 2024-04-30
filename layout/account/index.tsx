import {
  useEffect,
  useState
} from 'react'
import { useAuth } from 'context/auth'
import { auth } from 'lib/firebase'
import { Card, Flex } from '@radix-ui/themes'
import { Button, Box, Container, Header, Typography, LoadingSkeleton } from 'components/common'
import { Avatar } from 'layout/game/components'
import { EditProfile } from './components/edit'
import { EditProfileTrigger } from './components/edit/component'
import { User as FirebaseUser, signOut } from 'firebase/auth'
import * as Styles from './styles'
import router from 'next/router'
import { paths } from 'constants/theme/routes'

export function AccountLayout () {
  const [userData, setUserData] = useState<FirebaseUser | null>()
  const [editProfileOpen, setEditProfileOpen] = useState<boolean>(false)
  const authN = useAuth()

  const userSignOut = () => {
    signOut(auth)
    router.push(paths.home)
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUserData(user)
    })
  }, [])

  return (
    <Styles.Container>
      <Header title="Account" breadcrumbs={[{ title: 'Accounts', href: paths.account }, { title: 'My Account', href: paths.account }]} />
      <Styles.Main>
        <Styles.Section>
          <Container>
            {(!authN?.user && (
              <LoadingSkeleton />
            )) || (
              <>
                <Styles.Box>
                  <h3>My Account</h3>
                  <Styles.SeparatorRoot />
                  <Card style={{ margin: '15px 0' }}>
                    <Flex gap="3" align="center">
                      <Flex gap="3" align="center">
                        <Avatar
                          src={ userData?.photoURL || ''}
                          alt={ userData?.displayName || 'Anonymous' }
                        />
                        <Typography>{ userData?.displayName || 'Anonymous' }</Typography>
                      </Flex>
                      <Box>
                        <Styles.HiddenText as="div" size="2" weight="bold">
                          ({ userData?.email || 'No email provided'})
                        </Styles.HiddenText>
                      </Box>
                      <Box>
                        <EditProfileTrigger variant="button" setEditProfileOpen={setEditProfileOpen} onclick={() => setEditProfileOpen(true)} />
                      </Box>
                      <Box justifyContent="flex-end" flex={1}>
                        <Styles.ShowText>{ userData?.metadata?.lastSignInTime ? (<><strong>Last Sign In:</strong> {userData?.metadata?.lastSignInTime}</>) : '' }</Styles.ShowText>
                      </Box>
                    </Flex>
                  </Card>
                  <Styles.SeparatorRoot />
                  <Button onClick={userSignOut}>
                    <Box justifyContent="flex-end" flex={1} gap={0.5}>
                      <div style={{ color: 'white' }}>Sign out</div>
                    </Box>
                  </Button>
                </Styles.Box>
              </>
            )}
          </Container>
        </Styles.Section>
        <EditProfile editProfileOpen={editProfileOpen} setEditProfileOpen={setEditProfileOpen} authN={authN} userData={userData} />
      </Styles.Main>
    </Styles.Container>
  )
}
