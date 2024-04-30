import * as Styles from './styles'

import { TextAreaProps } from './types'

export function TextArea (props: TextAreaProps) {
  const {
    errorMessage,
    register
  } = props

  const hasError = !!errorMessage

  const renderErrorMessage = () => {
    if (!hasError) return null

    return (
      <Styles.ErrorMessage color="error" size="xsm">{errorMessage}</Styles.ErrorMessage>
    )
  }

  return (
    <Styles.Container>
      <Styles.Textarea
        rows={5}
        cols={50}
        {...register}
        {...props} />
      {renderErrorMessage()}
    </Styles.Container>
  )
}
