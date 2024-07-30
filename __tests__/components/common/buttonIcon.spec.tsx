import { jest, describe, expect } from '@jest/globals'
import { render, fireEvent } from '@testing-library/react'
import { ButtonIcon } from '../../../components/common/button-icon'

describe('ButtonIcon component', () => {
  it('should spread remaining props to Styles.Button component', () => {
    const onClickMock = jest.fn()
    const ariaLabel = 'Test Button'

    const { getByLabelText } = render(
      <ButtonIcon
        icon={{ name: 'login', size: 16 }}
        label={ariaLabel}
        onClick={onClickMock}
      />
    )

    const button = getByLabelText(ariaLabel)

    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should allow unknown props to Styles.Button component', () => {
    const unknownProp = 'unknownProp'

    const { queryByTestId } = render(
      <ButtonIcon
        icon={{ name: 'login', size: 16 }}
        label="Test Button"
        data-testid={unknownProp}
      />
    )

    expect(queryByTestId(unknownProp)).not.toBeNull()
  })

  it('should call onClick handler when button is clicked', () => {
    const onClickMock = jest.fn()

    const { getByLabelText } = render(
      <ButtonIcon
        icon={{ name: 'login', size: 16 }}
        label="Test Button"
        onClick={onClickMock}
      />
    )

    const button = getByLabelText('Test Button')
    button.click()

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick handler when button is disabled', () => {
    const onClickMock = jest.fn()

    const { getByLabelText } = render(
      <ButtonIcon
        icon={{ name: 'login', size: 16 }}
        label="Test Button"
        onClick={onClickMock}
        disabled
      />
    )

    const button = getByLabelText('Test Button')
    button.click()

    expect(onClickMock).not.toHaveBeenCalled()
  })
})
