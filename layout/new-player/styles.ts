import { styled } from 'stitches.config'
import * as Separator from '@radix-ui/react-separator'

export const Main = styled('main', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: '1rem'
})

export const Content = styled('section', {
  width: '100%',
  maxWidth: '32rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
})

export const Form = styled('form', {
  strong: {
    fontSize: '$sm',
    color: '$heading',
    textAlign: 'center',
    width: '100%',
    display: 'inline-block'
  }
})

export const LogoContainer = styled('div', {
  textAlign: 'center',
  alignContent: 'center',
  display: 'inline-block'
})

export const Small = styled('div', {
  marginTop: '10px',
  textAlign: 'center',
  fontSize: '14px'
})

export const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: '#F0EEE4',

  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 }
})
