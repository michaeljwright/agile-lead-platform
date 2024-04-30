import { useState } from 'react'
import * as Styles from './styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Box, Icon } from 'components/common'
import { Input } from 'components/common/input'
import type { SignInFormData } from './types'
import { signInValidations } from './validations'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import { auth, actionCodeSettings } from 'lib/firebase'
import { signInWithPopup, sendSignInLinkToEmail, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'

export function SignIn (props: any) {
  const [checkEmail, setCheckEmail] = useState<boolean>(false)
  const signInGoogleEnabled = process.env.GOOGLE_SIGNIN_ENABLED || null
  const signInMicrosoftEnabled = process.env.MICROSOFT_SIGNIN_ENABLED || null
  const signInMagicLinkEnabled = process.env.MAGICLINK_SIGNIN_ENABLED || null

  const userSignInGoogle = () => signInWithPopup(auth, new GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' }))
    .catch((error) => {
      console.log('Caught error Popup closed', error.message)
    })

  const userSignInMicrosoft = () => signInWithPopup(auth, new OAuthProvider('microsoft.com'))
    .catch((error) => {
      console.log('Caught error Popup closed', error.message)
    })

  const userSignInEmailLink = (email: string) => sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('redirectUrl', window.location.href)
      window.localStorage.setItem('emailForSignIn', email)
      setCheckEmail(true)
    })
    .catch((error) => {
      console.log('Caught error email link sign up', error.message)
    })

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    userSignInEmailLink(data.email)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInValidations)
  })

  return (
    <Styles.DialogRoot>
      {(!props?.variant && (
        <Styles.DialogTrigger>
          Sign In
        </Styles.DialogTrigger>
      )) || (
        <>
          {(props.fullWidth && (
            <Styles.DialogTriggerAlt fullWidth>
              Sign In
            </Styles.DialogTriggerAlt>
          )) || (
            <Styles.DialogTriggerAlt>
              Sign In
            </Styles.DialogTriggerAlt>
          )}
        </>
      )}
      <Styles.DialogPortal>
        <Styles.DialogOverlay />
        <Styles.DialogContent>
          <Styles.DialogTitle>Sign In</Styles.DialogTitle>
          {(!checkEmail && (
            <>
              <Styles.DialogDescription>
                {signInMagicLinkEnabled ? 'Please enter your email and click `Email Login` to send a magic link to sign in. Or use the other sign in buttons.' : 'Use the button(s) below to sign in with your provider.'}
              </Styles.DialogDescription>
              {signInMagicLinkEnabled && (
                <Styles.Form onSubmit={handleSubmit(onSubmit)}>
                  <Box flexDirection="column" gap={0.5} marginTop={2}>
                    <Input
                      label="Enter your email address"
                      id="email"
                      placeholder="abc@company.com"
                      errorMessage={errors?.email?.message}
                      maxLength={150}
                      {...register('email', {
                        required: 'Email is required',
                        validate: {
                          maxLength: (v) =>
                            v.length <= 50 || 'The email should have at most 50 characters',
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                            'Email address must be a valid address'
                        }
                      })}
                    />
                  </Box>
                  <Button fullWidth>Email Login</Button>
                </Styles.Form>
              )}
              {signInGoogleEnabled && (
                <Styles.Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                  <Button variant="letter" onClick={userSignInGoogle} fullWidth>
                    <Box justifyContent="flex-end" flex={1} gap={0.5}>
                      <Icon name="google" size={16} />
                      <div>Google Login</div>
                    </Box>
                  </Button>
                </Styles.Flex>
              )}
              {signInMicrosoftEnabled && (
                <Styles.Flex css={{ marginTop: signInGoogleEnabled ? 10 : 25, justifyContent: 'flex-end' }}>
                  <Button variant="letter" onClick={userSignInMicrosoft} fullWidth>
                    <Box justifyContent="flex-end" flex={1} gap={0.5}>
                      <Icon name="microsoft" size={16} />
                      <div>Microsoft Login</div>
                    </Box>
                  </Button>
                </Styles.Flex>
              )}
            </>
          )) || (
            <Styles.DialogDescription>
              We have sent a magic link to your email to sign in. Please check your spam folder.
            </Styles.DialogDescription>
          )}
          <Styles.DialogClose asChild>
            <Styles.IconButton aria-label="Close">
              <Cross2Icon />
            </Styles.IconButton>
          </Styles.DialogClose>
        </Styles.DialogContent>
      </Styles.DialogPortal>
    </Styles.DialogRoot>
  )
}
