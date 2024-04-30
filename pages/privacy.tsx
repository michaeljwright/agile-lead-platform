import { Head } from 'components/common/head'
import { PrivacyLayout } from 'layout/privacy'

export default function Home () {
  return (
    <>
      <Head
        title="Privacy Policy"
        description="Realtime rooms help you estimate your tasks in a collaborative scrum poker"
      />
      <PrivacyLayout />
    </>
  )
}
