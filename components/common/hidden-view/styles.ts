import { styled } from 'stitches.config'

export const Container = styled('div', {
  variants: {
    fullWidth: {
      true: {
        width: '100%'
      }
    },
    hidden: {
      true: {
        display: 'none'
      }
    }
  }
})
