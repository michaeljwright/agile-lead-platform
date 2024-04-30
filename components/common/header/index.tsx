import { Fragment } from 'react'
import { Box, Menu } from 'components/common'
import { DropdownMenu } from 'components/common/dropdown-menu'
import * as Styles from './styles'
import Link from 'next/link'
import { paths } from 'constants/theme/routes'
import { Flex } from '@radix-ui/themes'
import Image from 'next/image'

export function Header (props: any) {
  const whitelabel = process.env.WHITELABEL || null

  return (
    <>
      <Styles.Header>
        <Link href={paths.home}>
          <Box gap={1} alignItems="center">
            {(whitelabel && (
              <Image src={`/whitelabel/${whitelabel}.png`} alt={whitelabel} width="0" height="0" sizes="100vw" style={{ width: 'auto', height: '30px' }} priority={true} />
            )) || (
              <h2>AgileLead. </h2>
            )}
          </Box>
        </Link>
        <Box justifyContent="flex-end" fullWidth>
          <Menu setOpen={props.setOpen} />
        </Box>
        {!props.breadcrumbsdisabled && (
          <Styles.SubHeader>
            <Flex>
              {(!props?.breadcrumbs || props?.breadcrumbs?.length === 0) && (
                <Link key="breadcrumb-1" style={{ fontSize: '12px' }} href="/">
                  <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{ props?.title || 'Dashboard' }</span>
                </Link>
              )
              }
              {props?.breadcrumbs?.map((breadcrumb: any, i: number) => {
                return (
                  <Fragment key={`breadcrumb-${i}`}>
                    <Link href={breadcrumb.href}>
                      <span style={{ fontSize: '12px', fontWeight: i === 0 ? 'bold' : 'normal' }}>{breadcrumb.title}</span>
                    </Link>
                    {(i + 1 !== props?.breadcrumbs?.length) && (
                      <Styles.SeparatorRoot decorative orientation="vertical" />
                    )}
                  </Fragment>
                )
              })}
              <Box justifyContent="flex-end" flex={1}>
                <Flex gap="3" align="center" style={{ fontSize: '12px', marginRight: '10px' }}>
                  <Styles.ResponiveQuickMenu>Quick Menu</Styles.ResponiveQuickMenu> <DropdownMenu setOpen={props.setOpen} />
                </Flex>
              </Box>
            </Flex>
          </Styles.SubHeader>
        )}
      </Styles.Header>
    </>
  )
}
