import React from 'react'
import { AuthContextParams } from 'context/auth/types'
import { User as FirebaseUser } from 'firebase/auth'
export interface EditProfileFormData {
  displayName: string
  email: string
  photoURL?: string
}

export interface EditProfileProps {
  authN: AuthContextParams,
  editProfileOpen: boolean,
  setEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>,
  userData: FirebaseUser | null | undefined
}
