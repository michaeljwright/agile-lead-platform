import { HiddenViewProps } from './types'

import * as Styles from './styles'

export function HiddenView (props: HiddenViewProps) {
  const {
    breakpoint,
    children,
    hidden,
    fullWidth = false
  } = props

  const _breakpoint = `@${breakpoint}`

  if (hidden) return <></>

  return (
    <Styles.Container
      fullWidth={fullWidth}
      hidden={{
        [_breakpoint]: 'true'
      }}
    >
      {children}
    </Styles.Container>
  )
}
