import { styled, keyframes } from 'stitches.config'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translateX(100%)' },
  '100%': { opacity: 1, transform: 'translateX(0)' }
})

export const Overlay = styled(AlertDialog.Overlay, {
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
})

export const Root = styled(AlertDialog.Root, {})

export const Portal = styled(AlertDialog.Portal, {})

export const Trigger = styled(AlertDialog.Trigger, {})

export const Cancel = styled(AlertDialog.Cancel, {})

export const Content = styled(AlertDialog.Content, {
  backgroundColor: '$foreground',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: 0,
  right: 0,
  width: '100%',
  maxWidth: '28.75rem',
  height: '100vh',
  borderRadios: 0,
  animation: `${contentShow} 0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  '&:focus': {
    outline: 'none'
  }
})

export const List = styled('ul', {
  margin: '2rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  flex: 1,
  overflowY: 'auto'
})
