import * as y from 'yup'
import { FORM_VALIDATION_MESSAGES } from 'constants/messages'

export const playerRegisterValidations = y.object({
  name: y.string().required(FORM_VALIDATION_MESSAGES.required)
})
