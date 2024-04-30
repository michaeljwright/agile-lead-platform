import { Box, Button, Typography } from 'components/common'
import { useLocalStorage } from 'hooks'
import Link from 'next/link'

import { Compliance } from './types'
import * as Styles from './styles'

const baseCookies: Compliance[] = [
  {
    concentGiven: false,
    lastUpdate: new Date().toISOString(),
    type: 'Analytics'
  }
]

export function CookieWarn () {
  const [concents, setConcents] = useLocalStorage<Compliance[]>('cookies-warn', baseCookies)

  const handleAccept = () => {
    setConcents(prevState => prevState.map(item => ({
      ...item,
      concentGiven: true
    })))
  }

  const isAcceptAllConcents = !concents.map(item => item.concentGiven).includes(false)

  if (isAcceptAllConcents) return null

  return (
    <Styles.Container>
      <Styles.Content>
        <Box
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          flexDirection={{
            '@initial': 'column',
            '@table-min': 'row'
          }}>
          <Box flexDirection="column" gap={0.5}>
            <Typography
              textAlign={{
                '@initial': 'center',
                '@table-min': 'left'
              }}
            >
          We use cookies on this website to improve your user experience.
            </Typography>
            <Typography
              textAlign={{
                '@initial': 'center',
                '@table-min': 'left'
              }}
            >For more information, consult the <Link href="/privacy" target='_blank'>privacy policies</Link> and <Link href="/terms" target='_blank'>terms &amp; conditions</Link></Typography>
          </Box>
          <Button onClick={handleAccept}>I agree</Button>
        </Box>
      </Styles.Content>
    </Styles.Container>
  )
}
