import * as y from 'yup'
import { FORM_VALIDATION_MESSAGES } from 'constants/messages'

export const inviteUserValidations = y.object({
  email: y.string().required(FORM_VALIDATION_MESSAGES.required).matches(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/, 'Email address must be a valid address and separated by comma')
})
