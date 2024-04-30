import * as y from 'yup'
import { FORM_VALIDATION_MESSAGES } from 'constants/messages'

export const signInValidations = y.object({
  email: y.string().email().required(FORM_VALIDATION_MESSAGES.required)
})
