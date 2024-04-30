import { styled } from 'stitches.config'

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
