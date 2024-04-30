import { DialogProps } from '@radix-ui/react-alert-dialog'
import { Player } from 'lib/firestore/types'

type RootDialogProps = Pick<DialogProps, 'open' | 'onOpenChange'>

export interface NewSprintProps extends RootDialogProps {
}

export interface NewSprintFormData {
  name: string
  isActive: boolean
  creator: Player[]
}
