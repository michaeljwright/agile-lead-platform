import { styled } from 'stitches.config'
import { Typography } from 'components/common/typography'

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

export const ErrorMessage = styled(Typography, {
  color: '$error'
})

export const Textarea = styled('textarea', {
  borderColor: '$highlight',
  borderWidth: '1px',
  width: '100%',
  borderStyle: 'solid',
  outline: 'none',
  padding: '1rem',
  background: 'none',
  borderRadius: '5px',

  variants: {
    hasError: {
      true: {
        borderColor: '$error',
        color: '$error'
      }
    }
  }
})
