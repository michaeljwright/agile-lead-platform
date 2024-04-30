import { SelectProps as RadixSelectProps } from '@radix-ui/react-select'

export interface SelectProps extends Pick<RadixSelectProps, 'value' | 'onValueChange'> {
}
