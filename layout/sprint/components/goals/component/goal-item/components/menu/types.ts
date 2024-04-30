import { ReactNode } from 'react'

export interface MenuProps {
  children: ReactNode
  onDelete?: () => void
}
