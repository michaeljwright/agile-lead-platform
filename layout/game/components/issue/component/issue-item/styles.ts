import { styled } from 'stitches.config'

export const Container = styled('div', {
  background: '$background',
  padding: '1.2rem',
  borderRadius: '$default',
  border: '1px solid #F0EEE4',

  variants: {
    active: {
      true: {
        border: '1px solid $foregroundActive'
      }
    }
  }
})

export const Label = styled('span', {
  fontSize: '$sm',
  lineHeight: '1.45em'
})

export const Button = styled('button', {
  padding: '1rem 1.2rem',
  color: '$background',
  borderRadius: '$default',

  variants: {
    variant: {
      primary: {
        background: '$primary'
      },
      letter: {
        color: '$primary',
        border: '1px solid $primary'
      }
    }
  }
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
})
