import { ReactNode } from 'react'

import { KeyBreakpoints } from 'constants/theme'

export interface HiddenViewProps {
  breakpoint?: KeyBreakpoints,
  children?: ReactNode
  fullWidth?: boolean
  hidden?: boolean
}
