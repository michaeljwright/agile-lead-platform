import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import appsImg from 'public/agile-lead-apps.png'
import { Button, Container, Toast, Header } from 'components/common'
import * as Styles from './styles'
import { paths } from 'constants/theme/routes'
import { auth } from '../../lib/firebase'
import { User as FirebaseUser } from 'firebase/auth'

export function HomeLayout () {
  const [user, setUser] = useState<FirebaseUser | null>()
  const [toastOpen, setToastOpen] = useState<boolean>(false)
  const router = useRouter()

  const newGame = () => {
    if (user) {
      router.push(paths.games)
    } else {
      setToastOpen(true)
    }
  }

  const teams = () => {
    if (user) {
      router.push(paths.teams)
    } else {
      setToastOpen(true)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user)
    })
  }, [user, router])

  return (
    <Styles.Container>
      <Header breadcrumbsdisabled={true} />
      <Styles.Main>
        <Styles.Section>
          <Container>
            <Styles.Box>
              <Styles.BoxLeft>
                <Styles.Discovery>
                  <h2>Discovery</h2>
                  <h1>Fun, easy &amp; reliable estimations</h1>
                  <Button as="a" variant="outline" onClick={newGame}>Start planning poker</Button>
                </Styles.Discovery>
                <Styles.Delivery>
                  <h2>Delivery</h2>
                  <h1>Define sprint goals &amp; track waste</h1>
                  <Button as="a" onClick={teams}>Start new sprint</Button>
                </Styles.Delivery>
              </Styles.BoxLeft>
              <Styles.BoxRight>
                <Image priority width={'550'} src={appsImg} alt="cards" />
              </Styles.BoxRight>
            </Styles.Box>
          </Container>
          <Toast open={toastOpen} setOpenState={setToastOpen} title="Oops! Please Sign In" description="You need to Sign In to do this." />
        </Styles.Section>
        <Styles.SeparatorRoot />
      </Styles.Main>
    </Styles.Container>
  )
}
