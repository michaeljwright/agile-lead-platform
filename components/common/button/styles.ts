import { styled } from 'stitches.config'

export const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  transition: '.2s',
  justifyContent: 'center',
  position: 'relative',
  whiteSpace: 'nowrap',
  borderRadius: '3px',
  '&:disabled': {
    cursor: 'not-allowed'
  },
  variants: {
    fullWidth: {
      true: {
        width: '100%'
      }
    },
    variant: {
      primary: {
        background: '$primary',
        padding: '0.5rem',
        '&:hover': {
          background: '$primaryActive'
        },
        '&:disabled': {
          background: '$disabled'
        },
        '> *': {
          color: '$background',
          fontWeight: 600
        }
      },
      stroke: {
        background: 'none',
        border: '1px solid $foregroundActive',
        padding: '0.5rem',
        '&:hover': {
          background: '$foregroundActive'
        },
        '> *': {
          color: '$white',
          fontSize: '$xsm'
        }
      },
      outline: {
        background: '#FFFFFF',
        border: '1px solid #FFFFFF',
        padding: '0.5rem',
        fontWeight: 600,
        '&:hover': {
          background: '#FFFFFF'
        },
        '> *': {
          color: '$heading'
        }
      },
      letter: {
        background: 'none',
        border: '1px solid $primary',
        padding: '0.5rem',
        '> *': {
          color: '$heading'
        }
      }
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export const LoaderContainer = styled('div', {
  position: 'absolute',

  svg: {
    width: '36px'
  }
})
