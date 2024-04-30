import * as Select from '@radix-ui/react-select'
import { styled } from 'stitches.config'

export const Trigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$default',
  fontSize: 13,
  lineHeight: 1,
  gap: 5,
  width: '3rem',
  height: '3rem',
  border: '$heading 1px solid',
  color: '$heading',
  '&:hover, &:focus': {
    border: '$heading 1px solid'
  },
  '&[data-placeholder]': {
    color: '$background'
  }
})

export const Content = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: '$background',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)'
})

export const Item = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  color: '$text',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '3rem',
  width: '3rem',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$text',
    opacity: 0.8
  },

  '&[data-state="checked"]': {
    background: '$foreground',
    borderRadius: '$default'
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$foreground',
    color: '$heading'
  }
})

export const Viewport = styled(Select.Viewport, {
  padding: 5,
  display: 'flex',
  flexWrap: 'wrap',
  width: '10rem'
})

export const {
  Root,
  Portal,
  ItemText,
  Value
} = Select
