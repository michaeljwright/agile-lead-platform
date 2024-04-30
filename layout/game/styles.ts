import { styled, keyframes } from 'stitches.config'
import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

export const Container = styled('div', {
  display: 'grid',
  height: '100vh'
})

export const Header = styled('header', {
  width: '100%',
  backdropFilter: 'blur(5px)',
  position: 'sticky',
  top: 0,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between'
})

export const Main = styled('main', {
  flex: 1,
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column'
})

export const IssueLabel = styled('span', {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '300px',
  fontWeight: '800'
})

export const Hand = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  '@laptops-min': {
    justifyContent: 'center'
  }
})

export const Count = styled('strong', {
  fontSize: '$md',
  color: '$heading'
})

export const PlayerName = styled('strong', {
  textAlign: 'center',

  variants: {
    me: {
      true: {
        color: '$heading'
      }
    }
  }
})

export const BoardName = styled('strong', {
  color: '$heading',
  fontWeight: 600,
  display: 'block',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
  width: '100px',

  '@smartphone-min': {
    width: '200px'
  },
  '@laptops-min': {
    width: '500px'
  }
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
  position: 'absolute',
  top: 10,
  right: 10
})

export const DialogTrigger = styled(Dialog.Trigger, {
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
        padding: '1rem',

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
        padding: '1rem',

        '&:hover': {
          background: '$foregroundActive'
        },
        '> *': {
          color: '$white',
          fontSize: '$xsm'
        }
      },
      letter: {
        background: 'none',
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

export const DialogDescription = styled('div', {
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
