import { describe, expect } from '@jest/globals'
import { render } from '@testing-library/react'
import { Box } from '../../../components/common/box'
import '@testing-library/jest-dom'

describe('Box component', () => {
  it('renders with all props set to valid values', () => {
    const children = <div>Test content</div>
    const fullWidth = true
    const gap = 2
    const marginTop = 1
    const justifyContent = 'center'
    const flexDirection = 'row'
    const alignItems = 'center'
    const backgroundColor = 'red'

    const { getByText } = render(
      <Box
        fullWidth={fullWidth}
        gap={gap}
        marginTop={marginTop}
        justifyContent={justifyContent}
        flexDirection={flexDirection}
        alignItems={alignItems}
        backgroundColor={backgroundColor}
      >
        {children}
      </Box>
    )

    expect(getByText('Test content')).toBeInTheDocument()
    expect(getByText('Test content').parentElement).toHaveStyle({
      display: 'flex',
      width: '100%',
      backgroundColor: 'red'
    })
  })

  // Additional tests for different prop combinations
  it('renders with fullWidth set to false', () => {
    const children = <div>Test content</div>
    const { getByText } = render(<Box fullWidth={false}>{children}</Box>
    )
    expect(getByText('Test content')).toBeInTheDocument()
  })

  it('renders with gap set to 0', () => {
    const children = <div>Test content</div>
    const { getByText } = render(<Box gap={0}>{children}</Box>)
    expect(getByText('Test content')).not.toHaveStyle({ gap: '0rem' })
  })

  it('renders with marginTop set to 0', () => {
    const children = <div>Test content</div>
    const { getByText } = render(<Box marginTop={0}>{children}</Box>)
    expect(getByText('Test content')).not.toHaveStyle({ marginTop: '0rem' })
  })
})
