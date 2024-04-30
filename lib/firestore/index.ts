import { getFirestore } from 'firebase/firestore'
import { firebase } from 'lib/firebase'
export * from './common'
export * from './games'
export * from './sprints'
export * from './teams'
export const firestore = getFirestore(firebase)
