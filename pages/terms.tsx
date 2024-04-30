import { Head } from 'components/common/head'
import { TermsLayout } from 'layout/terms'

export default function Home () {
  return (
    <>
      <Head
        title="Privacy Policy"
        description="Realtime rooms help you estimate your tasks in a collaborative scrum poker"
      />
      <TermsLayout />
    </>
  )
}
