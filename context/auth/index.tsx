import { onAuthStateChanged, User as AuthUser } from 'firebase/auth'

import { auth, signInAnonymously } from 'lib/auth'
import { User, Player } from 'lib/firestore/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextParams } from './types'

const AuthContext = createContext({} as AuthContextParams)

export function AuthProvider ({ children }: any) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const handleCheckContextualAdmin = (users: User[] | Player[], creator: User | Player | undefined) => {
    return !!(users && (users.find(u => u?.role === 'admin' && u?.id === user?.uid) || (creator?.role === 'admin' && user?.uid === creator?.id)))
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user || null)
    })
  }, [])

  const handleSignInAnonymously = async () => {
    return await signInAnonymously()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isSigned: !!user,
        signInAnonymously: handleSignInAnonymously,
        isContextualAdmin: handleCheckContextualAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
