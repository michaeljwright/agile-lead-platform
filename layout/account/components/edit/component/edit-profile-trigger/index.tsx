import { ButtonIcon } from 'components/common'

export const EditProfileTrigger = (props: any) => {
  const variantButton = props.variant || null

  return (
    <>
      {(!variantButton && (
        <a onClick={() => props.setEditProfileOpen(true)}>
          Edit Profile
        </a>
      )) || (
        <ButtonIcon label="open game" icon={{ name: 'edit', color: 'background', size: 18 }} onClick={() => props.setEditProfileOpen(true)} />
      )}
    </>
  )
}
