import { Box, Icon } from 'components/common'
import { Menu } from './components'
import * as Styles from './styles'
import { GoalItemProps } from './types'

export function GoalItem (props: GoalItemProps) {
  const {
    name,
    onDelete
  } = props

  return (
    <Styles.Container>
      <Box flexDirection="column" gap={1}>
        <Styles.Label>{name}</Styles.Label>
        <Box justifyContent="flex-end" flex={1}>
          <div style={{ marginTop: '-30px' }}>
            <Menu onDelete={onDelete}>
              <Icon name="threeDotsVertical" />
            </Menu>
          </div>
        </Box>
      </Box>
    </Styles.Container>
  )
}
