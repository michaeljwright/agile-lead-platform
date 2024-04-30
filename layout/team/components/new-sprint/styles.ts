import { styled, keyframes } from 'stitches.config'
import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'

export const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: '#F0EEE4',
  margin: '15px 0',
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 }
})

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

export const itemStyles = {
  padding: '8px 12px',
  marginLeft: '8px',
  outline: 'none',
  userSelect: 'none',
  fontWeight: 600,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 12,
  color: '$heading',
  border: '1px solid #F0EEE4',
  '&:focus': { boxShadow: '0 0 0 2px $heading' },
  '&:hover': { backgroundColor: '#F2F3F4', color: '$heading', border: '1px solid #D3D3D3' },
  '>svg': { background: 'none', color: '$heading' }
}

export const DialogTrigger = styled(Dialog.Trigger, {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  transition: '.2s',
  justifyContent: 'center',
  position: 'relative',
  whiteSpace: 'nowrap',
  borderRadius: '3px',
  color: 'white',
  fontWeight: 600,

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
          color: '$heading',
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
          color: '$heading',
          fontSize: '$xsm'
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

export const Flex = styled('div', { display: 'flex' })

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

export const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15
})

export const Label = styled('label', {
  fontSize: 15,
  width: 90,
  textAlign: 'right'
})

export const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  height: 35
})

export const Form = styled('form', {
  strong: {
    fontSize: '$sm',
    color: '$heading',
    textAlign: 'center',
    width: '100%',
    display: 'inline-block'
  }
})

export const PickerLabel = styled('label', {
  '&.react-datepicker-wrapper.react-datepicker__input-container.picker': {
    all: 'unset',
    width: '100%',
    flex: '1',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    background: '#FFC0CB',
    borderColor: '#FFC0CB',
    padding: '0 10px',
    fontSize: 15,
    lineHeight: 1,
    height: 35
  }
})
