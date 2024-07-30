import { jest, describe, expect } from '@jest/globals'
import { render, fireEvent } from '@testing-library/react'
import { Button } from '../../../components/common/button'
import '@testing-library/jest-dom'

describe('Button component', () => {
  it('renders without crashing', () => {
    render(<Button>Test Button</Button>)
  })

  it('calls onClick event', () => {
    const mockOnClick = jest.fn()
    const { getByText } = render(<Button onClick={mockOnClick}>Test Button</Button>)
    fireEvent.click(getByText('Test Button'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
