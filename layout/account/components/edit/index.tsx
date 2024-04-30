import { useForm } from 'react-hook-form'
import {
  Box,
  Icon,
  Typography,
  Button
} from 'components/common'
import { Input } from 'components/common/input'
import * as Styles from './styles'
import { EditProfileFormData, EditProfileProps } from './types'
import { updateProfile } from 'lib/auth'
import router from 'next/router'

export function EditProfile (props: EditProfileProps) {
  const {
    register,
    handleSubmit
  } = useForm<EditProfileFormData>({ values: { displayName: props?.userData?.displayName ?? 'Error', email: props?.userData?.email ?? 'Error' } })

  const onSubmit = async (data: EditProfileFormData) => {
    if (props.authN.user) {
      await updateProfile(
        props.authN.user,
        data.displayName,
        data.photoURL ?? null
      )
    }
    router.reload()
  }

  return (
    <Styles.Root open={props.editProfileOpen}>
      <Styles.Portal>
        <Styles.Overlay onClick={() => props.setEditProfileOpen(false)} />
        <Styles.Content>
          <Box fullWidth justifyContent="space-between" alignItems="center">
            <Typography as="strong" color="heading" size="md" fontWeight="400">Edit Profile</Typography>
            <a onClick={() => props.setEditProfileOpen(false)}>
              <Icon name="close" />
            </a>
          </Box>
          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <Box flexDirection="column" gap={0.5} marginTop={2}>
              <Input
                label="Full name"
                name="displayName"
                id="displayName"
                register={register('displayName')}
                maxLength={100}
              />
              <Input
                label="Email address"
                name="email"
                id="email"
                register={register('email')}
                disabled
                maxLength={200}
              />
            </Box>
            <Box gap={0.5}>
              <Button fullWidth>Save Profile</Button>
            </Box>
          </Styles.Form>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}
