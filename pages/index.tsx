import { Head } from 'components/common/head'
import { HomeLayout } from 'layout/home'

export default function Home () {
  return (
    <>
      <Head
        title="An Agile Platform for Product Engineering"
        description="Create your team, set sprint goals, track waste and play planning poker to help estimate your stories"
      />
      <HomeLayout />
    </>
  )
}
