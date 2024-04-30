import { FORM_VALIDATION_MESSAGES } from 'constants/messages'
import * as y from 'yup'

export const newGameSchemaValidation = y.object({
  name: y
    .string()
    .required(FORM_VALIDATION_MESSAGES.required)
    .max(50, 'Reached the maximum number of characters, (max: 50)')
})
