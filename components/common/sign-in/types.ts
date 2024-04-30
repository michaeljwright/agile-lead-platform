import { DialogProps } from '@radix-ui/react-alert-dialog'

type RootDialogProps = Pick<DialogProps, 'open' | 'onOpenChange'>

export interface SignInProps extends RootDialogProps {
}

export interface SignInFormData {
  email: string
}
