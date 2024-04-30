import { Box, Icon, Typography } from 'components/common'
import { Menu } from './components'
import * as Styles from './styles'
import { WasteItemProps } from './types'

export function WasteItem (props: WasteItemProps) {
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
