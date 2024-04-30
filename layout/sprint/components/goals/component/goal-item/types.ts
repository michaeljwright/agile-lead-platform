import { SelectProps } from './components/select/types'
export interface GoalItemProps extends
  Pick<SelectProps, 'onValueChange' | 'value'> {
  name: string
  onDelete?: () => void
  index?: string
}
