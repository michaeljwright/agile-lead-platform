import { ReactNode, Dispatch, SetStateAction } from 'react'

export interface MenuProps {
  children: ReactNode
  setIsEditing: Dispatch<SetStateAction<boolean>>
  onDelete?: () => void
}
