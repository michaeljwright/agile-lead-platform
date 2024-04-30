import '@radix-ui/themes/styles.css'
import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import ErrorBoundary from 'components/error'
import { AuthProvider } from 'context/auth'
import { GameProvider } from 'context/game'
import { SprintProvider } from 'context/sprint'
import { globalStyle } from 'stitches.config'

const CookieWarn = dynamic(() => import('components/cooke-warn').then(mod => mod.CookieWarn), {
  ssr: false
})

export default function MyApp ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    globalStyle()
  }, [])

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CookieWarn />
        <SprintProvider>
          <GameProvider>
            <Component {...pageProps} />
          </GameProvider>
        </SprintProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}
