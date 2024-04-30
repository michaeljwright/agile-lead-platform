import { DialogProps } from '@radix-ui/react-alert-dialog'

type RootDialogProps = Pick<DialogProps, 'open' | 'onOpenChange'>

export interface InviteUserProps extends RootDialogProps {
}

export interface InviteUserFormData {
  email: string
}
