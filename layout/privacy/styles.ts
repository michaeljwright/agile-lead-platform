import { styled } from 'stitches.config'
import * as Separator from '@radix-ui/react-separator'

export const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: '#F0EEE4',
  margin: '15px 0',
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 }
})

export const Container = styled('div', {
  height: '100vh'
})

export const Main = styled('main', {
  width: '100%'
})

export const Section = styled('section', {
  width: '100%',
  display: 'inline-block',
  maxWidth: '100%',
  padding: '0 1rem',
  p: {
    marginBottom: '10px'
  },
  ul: {
    marginBottom: '10px'
  }
})
