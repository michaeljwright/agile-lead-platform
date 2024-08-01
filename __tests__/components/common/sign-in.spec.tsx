import { jest, expect } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react'
import { SignIn } from '../../../components/common/sign-in'
import '@testing-library/jest-dom'

describe('SignIn component', () => {
  it('opens modal for sign in', () => {
    const { getByText } = render(<SignIn />)

    fireEvent.click(getByText('Sign In'))

    expect(getByText('Enter your email address')).toBeInTheDocument()
    expect(getByText('Google Login')).toBeInTheDocument()

    fireEvent.click(getByText('Google Login'))
  })
})
