import { Roles } from 'lib/firestore/types'
import { ReactNode } from 'react'

export interface RoleViewProps {
  roles: Array<keyof typeof Roles>
  children: ReactNode
}
