import {
  Box,
  Icon,
  Typography
} from 'components/common'
import { AddWaste, WasteItem } from './component'
import * as Styles from './styles'
import { useSprint } from 'context/sprint'
import { WasteProps } from './types'

export function Waste (props: WasteProps) {
  const {
    sprint,
    onRemoveWaste
  } = useSprint()

  const renderWaste = sprint?.waste && sprint?.waste.map(waste =>
    <li key={`waste-item-${waste.id}`}>
      <WasteItem
        name={waste?.name || ''}
        onDelete={() => onRemoveWaste(waste.id)}
      />
    </li>
  )

  const renderWasteInfo = () => {
    if (sprint?.waste?.length === 0) return null

    return (
      <Box gap={1} marginTop={1}>
        <Typography>{`${sprint?.waste?.length} x waste items`}</Typography>
      </Box>
    )
  }

  return (
    <Styles.Root open={props.wasteOpen}>
      <Styles.Portal>
        <Styles.Overlay onClick={() => props.setWasteOpen(false)} />
        <Styles.Content>
          <Box fullWidth justifyContent="space-between" alignItems="center">
            <Typography as="strong" color="heading" size="md" fontWeight="400">Waste Snake</Typography>
            <a onClick={() => props.setWasteOpen(false)}>
              <Icon name="close" />
            </a>
          </Box>
          {renderWasteInfo()}
          <Styles.List>
            {renderWaste}
          </Styles.List>
          <AddWaste />
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}
