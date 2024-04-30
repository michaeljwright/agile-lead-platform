import { FirebaseOptions, getApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { firebaseConfig } from 'config/firebase'

const createFirebaseApp = (options: FirebaseOptions) => {
  try {
    return getApp()
  } catch (error) {
    return initializeApp(options)
  }
}

const firebase = createFirebaseApp(firebaseConfig)

const auth = getAuth(firebase)

const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

const actionCodeSettings = {
  url: siteUrl,
  handleCodeInApp: true
}

export { firebase, auth, actionCodeSettings }
