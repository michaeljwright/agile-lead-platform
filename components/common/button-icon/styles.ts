import { styled } from 'stitches.config'

export const ButtonContainer = styled('div', {

})

export const Button = styled('button', {
  padding: '0.2rem',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '$heading',

  variant: {
    primary: {
      background: '$heading'
    },
    letter: {
      background: 'none',
      border: '1px solid $primary',
      padding: '1rem',
      '> *': {
        color: '$heading'
      }
    }
  },
  defaultVariants: {
    variant: 'primary'
  },

  '&:disabled': {
    opacity: 0.4,
    cursor: 'auto'
  }
})

export const ButtonOutlined = styled('button', {
  padding: '0.2rem',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '$heading',

  variant: {
    primary: {
      background: '$heading'
    },
    letter: {
      background: 'none',
      border: '1px solid $primary',
      padding: '1rem',
      '> *': {
        color: '$heading'
      }
    }
  },
  defaultVariants: {
    variant: 'letter'
  },

  '&:disabled': {
    opacity: 0.4,
    cursor: 'auto'
  }
})
