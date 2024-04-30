import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { paths } from 'constants/theme/routes'
import { Icon, SignIn } from 'components/common'
import * as Styles from './styles'
import { auth } from 'lib/firebase'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'

export function Menu (props: any) {
  const router = useRouter()
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user)
    })
  }, [user])

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn')
      const redirectUrl = window.localStorage.getItem('redirectUrl')
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn')
            window.localStorage.removeItem('redirectUrl')
            if (redirectUrl) router.push(redirectUrl)
          })
          .catch((error) => {
            console.log('Caught error email link sign up on activation', error.message)
          })
      }
    }

    auth.onAuthStateChanged(async (user) => {
      setUser(user)
    })
  }, [user, router])

  return (
    <Styles.NavigationMenuRoot>
      {(user && (
        <Styles.NavigationMenuList>
          <Styles.NavigationMenuItem onClick={() => router.push(paths.home)} title='Home'>
            <Styles.NavigationMenuLinkHome>
              <Icon name="home" size={12} />
            </Styles.NavigationMenuLinkHome>
          </Styles.NavigationMenuItem>

          <Styles.NavigationMenuItem onClick={() => router.push(paths.account)} title='Account'>
            <Styles.NavigationMenuLink>
              <Icon name="user" size={12} />
            </Styles.NavigationMenuLink>
          </Styles.NavigationMenuItem>

          <Styles.NavigationMenuItem onClick={() => router.push(paths.games)} title='Estimate'>
            <Styles.NavigationMenuLink>
              <Icon name="discovery" size={12} />
            </Styles.NavigationMenuLink>
          </Styles.NavigationMenuItem>

          <Styles.NavigationMenuItem onClick={() => router.push(paths.teams)} title='Delivery'>
            <Styles.NavigationMenuLink>
              <Icon name="delivery" size={12} />
            </Styles.NavigationMenuLink>
          </Styles.NavigationMenuItem>

          <Styles.NavigationMenuIndicator>
            <Styles.Arrow />
          </Styles.NavigationMenuIndicator>
        </Styles.NavigationMenuList>
      )) || (
        <Styles.NavigationMenuList>
          <Styles.NavigationMenuItem onClick={() => router.push(paths.home)}>
            <Styles.NavigationMenuLinkHome>
              <Icon name="home" size={12} />
            </Styles.NavigationMenuLinkHome>
          </Styles.NavigationMenuItem>

          <Styles.NavigationMenuItem>
            <SignIn />
          </Styles.NavigationMenuItem>
        </Styles.NavigationMenuList>
      )}
      <Styles.ViewportPosition>
        <Styles.NavigationMenuViewport />
      </Styles.ViewportPosition>
    </Styles.NavigationMenuRoot>
  )
}
