import { VariantProps } from '@stitches/react'
import { TextareaHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types'

import { Container } from './styles'

type RootTextareaProps = Pick<TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'value'
  | 'id'
  | 'autoFocus'
  | 'placeholder'
  | 'rows'
>

type TextareaStylesProps = Pick<VariantProps<typeof Container>,
  'fullWidth'
>

export interface TextAreaProps extends
  RootTextareaProps,
  TextareaStylesProps {
    label?: string
    register?: UseFormRegisterReturn
    errorMessage?: string
}
