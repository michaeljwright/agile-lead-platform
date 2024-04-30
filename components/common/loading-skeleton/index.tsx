import * as Styles from './styles'
import { SignIn } from 'components/common'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function LoadingSkeleton (props: any) {
  return (
    <>
      <Skeleton count={props?.count || 3} duration={props?.duration || 1} />
      {props?.showSignIn && (
        <>
          <Styles.SeparatorRoot />
          <Styles.Text>{ props?.customText || 'Looks like you are not logged in. Please sign in' }</Styles.Text>
          { props?.customButton || (<SignIn variant="primary" />)}
        </>
      )}
    </>
  )
}
