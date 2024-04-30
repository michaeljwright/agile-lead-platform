import { styled, keyframes } from 'stitches.config'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' }
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' }
})

export const Content = styled(DropdownMenu.Content, {
  border: '$foregroundActive 1px solid',
  minWidth: 150,
  background: '$background',
  borderRadius: '$default',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade }
  },
  padding: '0.4rem'
})

export const Arrow = styled(DropdownMenu.Arrow, { fill: '$background' })

export const Item = styled(DropdownMenu.Item, {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: 'white',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '4px 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',
  backgroundColor: '$heading',
  marginBottom: '3px',
  '&[data-disabled]': {
    color: '$disabled',
    pointerEvents: 'none'
  },

  '&[data-highlighted]': {
    opacity: 0.8
  },

  variants: {
    danger: {
      true: {
        color: '$error'
      }
    }
  }
})

export const {
  Root,
  Trigger,
  Portal
} = DropdownMenu
