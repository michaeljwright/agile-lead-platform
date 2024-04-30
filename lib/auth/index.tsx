import {
  getAuth,
  signInAnonymously as rootSignInAnonymously,
  updateProfile as rootUpdateProfile,
  signOut as rootSignOut,
  User as AuthUser
} from 'firebase/auth'
import { firebase } from 'lib/firebase'

export const auth = getAuth(firebase)

export function signInAnonymously () {
  return rootSignInAnonymously(auth)
}

export const updateProfile = async (user: AuthUser, displayName: string | null, photoURL: string | null) => {
  return await rootUpdateProfile(user, { displayName: displayName ?? user.displayName, photoURL: photoURL ?? user.photoURL }).then(() => console.log('UPDATED')).catch((err) => console.log(err))
}

export function signOut () {
  return rootSignOut(auth)
}
