import { DialogProps } from '@radix-ui/react-alert-dialog'

type RootDialogProps = Pick<DialogProps, 'open' | 'onOpenChange'>

export interface PlayerRegisterProps extends RootDialogProps {

}

export interface PlayerRegisterFormData {
  name: string
}
