import { Typography } from 'components/common/typography'
import { styled } from 'stitches.config'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  variants: {
    fullWidth: {
      true: {
        width: '100%'
      }
    }
  }
})

export const Input = styled('input', {
  borderColor: '$highlight',
  borderWidth: '1px',
  width: '100%',
  borderStyle: 'solid',
  height: '3rem',
  outline: 'none',
  padding: '0 1rem',
  background: 'none',
  borderRadius: '5px',

  '&::placeholder': {
    color: '$placeholders',
    fontSize: '0.8rem',
    fontWeight: '400'
  },

  '&:focus': {
    borderColor: '$primary'
  },

  '&:disabled': {
    background: '#F2F3F4',
    color: '#666666'
  },

  variants: {
    hasLeftIcon: {
      true: {
        paddingLeft: '2.52rem'
      }
    },
    hasRightIcon: {
      true: {
        paddingRight: '2.7rem'
      }
    },
    hasError: {
      true: {
        borderColor: '$error',
        color: '$error'
      }
    }
  }
})

export const Label = styled('label', {
  cursor: 'pointer',
  fontSize: '$footnote'
})

export const ErrorMessage = styled(Typography, {
  color: '$error'
})

export const LeftIconView = styled('div', {
  position: 'absolute',
  left: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const RightIconView = styled('div', {
  position: 'absolute',
  right: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const IconView = styled('div', {
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center'
})
