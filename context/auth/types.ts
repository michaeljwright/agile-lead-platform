import { User as AuthUser, UserCredential } from 'firebase/auth'
import { User } from 'lib/firestore/types'
export interface AuthContextParams {
  user: AuthUser | null
  isSigned?: boolean
  isLoading?: boolean
  signInAnonymously: () => Promise<UserCredential>
  isContextualAdmin: (users: User[], creator: User | undefined) => boolean
}
