import { styled } from 'stitches.config'

export const Container = styled('div', {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  minHeight: '6.375rem',
  background: '$foreground',
  borderTop: '$foregroundActive 1px solid',
  lineHeight: '1.5rem',
  zIndex: 10
})

export const Content = styled('div', {
  padding: '1rem',
  width: '100%',
  maxWidth: '52rem',
  margin: '0 auto',

  a: {
    textDecoration: 'underline'
  }
})
