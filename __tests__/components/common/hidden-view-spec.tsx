import { describe, expect } from '@jest/globals'
import { render } from '@testing-library/react'
import { HiddenView } from '../../../components/common/hidden-view'
import '@testing-library/jest-dom'

describe('HiddenView component', () => {
  it('renders children when not hidden', () => {
    const { getByText } = render(
      <HiddenView hidden={false}>
        <div>Test Content</div>
      </HiddenView>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('does not render children when hidden', () => {
    const { queryByText } = render(
      <HiddenView hidden={true}>
        <div>Test Content</div>
      </HiddenView>
    )
    expect(queryByText('Test Content')).toBeNull()
  })
})
