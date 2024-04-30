import { styled } from 'stitches.config'

export const Container = styled('div', {
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  padding: '0 1rem',

  '@table-min': {
    maxWidth: '100%',
    padding: '0 1rem'
  }
})
