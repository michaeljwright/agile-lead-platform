import {
  Analytics,
  getAnalytics,
  logEvent as rootLogEvent
} from 'firebase/analytics'
import { firebase } from 'lib/firebase'

let analytics: Analytics

if (typeof window !== 'undefined') {
  analytics = getAnalytics(firebase)
}

export const logEvent = (eventName: string, options?: Record<string, any>) => {
  rootLogEvent(analytics, eventName, options)
}
