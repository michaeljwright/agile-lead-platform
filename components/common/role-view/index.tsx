import { useGame } from 'context/game'

import { RoleViewProps } from './types'

export function RoleView (props: RoleViewProps) {
  const { children, roles } = props

  const { player } = useGame()

  if (!player?.role || !roles.includes(player?.role)) return null

  return (
    <>{children}</>
  )
}
