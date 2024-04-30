import { styled } from 'stitches.config'
import * as Separator from '@radix-ui/react-separator'

export const Text = styled('div', {
  fontSize: '$sm',
  color: '$heading',
  textAlign: 'center',
  alignContent: 'center',
  display: 'inline-block'
})

export const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: '#F0EEE4',

  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 }
})
