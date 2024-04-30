import * as Styles from './styles'
import { MenuProps } from './types'

export function Menu (props: MenuProps) {
  const {
    children,
    onDelete
  } = props

  return (
    <Styles.Root>
      <Styles.Trigger>
        {children}
      </Styles.Trigger>
      <Styles.Portal>
        <Styles.Content>
          <Styles.Item onClick={onDelete}>Delete Goal</Styles.Item>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}
