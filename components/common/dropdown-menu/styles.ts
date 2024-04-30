import { styled, keyframes } from 'stitches.config'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

export const slideUpAndFade = keyframes({
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

const contentStyles = {
  minWidth: 220,
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade }
  }
}

export const DropdownMenuRoot = styled(DropdownMenu.Root, {})
export const DropdownMenuTrigger = styled(DropdownMenu.Trigger, {})
export const DropdownMenuPortal = styled(DropdownMenu.Portal, {})

export const DropdownMenuContent = styled(DropdownMenu.Content, contentStyles)
export const DropdownMenuSubContent = styled(DropdownMenu.SubContent, contentStyles)

export const DropdownMenuArrow = styled(DropdownMenu.Arrow, { fill: 'white' })

const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: '$heading',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$heading',
    pointerEvents: 'none'
  },

  '&[data-highlighted]': {
    backgroundColor: '#F2F3F4',
    color: '#heading'
  }
}

export const DropdownMenuItem = styled(DropdownMenu.Item, itemStyles)
export const DropdownMenuCheckboxItem = styled(DropdownMenu.CheckboxItem, itemStyles)
export const DropdownMenuRadioItem = styled(DropdownMenu.RadioItem, itemStyles)
export const DropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: '#D3D3D3',
    color: '#333333'
  },
  ...itemStyles
})

export const DropdownMenuLabel = styled(DropdownMenu.Label, {
  paddingLeft: 25,
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '25px',
  color: '$heading'
})

export const DropdownMenuSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: '#D3D3D3',
  margin: 5
})

export const DropdownMenuItemIndicator = styled(DropdownMenu.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
  color: '$heading',
  '[data-highlighted] > &': { color: 'white' },
  '[data-disabled] &': { color: '$heading' }
})

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$heading',
  backgroundColor: 'white',
  '&:hover': { backgroundColor: '#D3D3D3' },
  '&:focus': { boxShadow: '0 0 0 2px $black' }
})

export const DialogTrigger = styled(Dialog.Trigger, {
  ...itemStyles,
  display: 'block',
  textDecoration: 'none',
  fontSize: 12,
  lineHeight: 1
})

export const DialogRoot = styled(Dialog.Root, {
  width: '100%'
})

export const DialogPortal = styled(Dialog.Portal, {
})

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: '$foreground',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
})

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  '&:focus': { outline: 'none' }
})

export const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: '$heading',
  fontSize: 17
})

export const DialogDescription = styled(Dialog.Description, {
  margin: '10px 0 20px',
  fontSize: 15,
  lineHeight: 1.5
})

export const DialogClose = styled(Dialog.Close, {
})

export const Table = styled('table', {
})

export const TableBody = styled('tbody', {
})

export const TableHead = styled('th', {
  padding: '5px',
  backgroundColor: '$heading',
  color: '$background'
})

export const TableRow = styled('tr', {
  padding: '5px',
  backgroundColor: '#F2F3F4'
})

export const TableCol = styled('td', {
  padding: '8px'
})

export const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: '#F0EEE4',
  margin: '15px 0',
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 }
})
