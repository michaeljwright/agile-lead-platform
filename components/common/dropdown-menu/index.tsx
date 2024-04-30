import { useState } from 'react'
import { useRouter } from 'next/router'
import { paths } from 'constants/theme/routes'
import { IssueTrigger } from '../../../layout/game/components/issue/component'
import { Box, Button, Icon, Typography } from 'components/common'
import * as Styles from './styles'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'

export const DropdownMenu = (props: any) => {
  const router = useRouter()
  const [guideOpen, setGuideOpen] = useState<boolean>(false)

  const GuideTrigger = (variant: any) => (
    <>
      {(variant === 'letter' && (
        <Button variant="letter" onClick={() => setGuideOpen(true)}>Guide</Button>
      )) || (
        <a onClick={() => setGuideOpen(true)} style={{ fontWeight: 'normal' }}>
          Estimation Guide
        </a>
      )}
    </>
  )

  const Guide = () => (
    <Styles.DialogRoot open={guideOpen}>
      <Styles.DialogPortal>
        <Styles.DialogOverlay onClick={() => setGuideOpen(false)} />
        <Styles.DialogContent>
          <Flex gap="3" align="center">
            <Styles.DialogTitle>Guide to Estimations</Styles.DialogTitle>
            <Box justifyContent="flex-end" flex={1}>
              <Flex gap="3" align="center">
                <Styles.DialogClose asChild onClick={() => setGuideOpen(false)}>
                  <Styles.IconButton aria-label="Close">
                    <Cross2Icon />
                  </Styles.IconButton>
                </Styles.DialogClose>
              </Flex>
            </Box>
          </Flex>
          <Typography size="xsm">These examples should be considered only a guide and all teams are different. We have taken the average estimation based on time and effort.</Typography>
          <Styles.SeparatorRoot css={{ margin: '15px 0' }} />
          <Styles.Table>
            <Styles.TableBody>
              <Styles.TableRow>
                <Styles.TableHead>Story Points</Styles.TableHead>
                <Styles.TableHead>T-shirt Size</Styles.TableHead>
                <Styles.TableHead>Description</Styles.TableHead>
              </Styles.TableRow>
              <Styles.TableRow>
                <Styles.TableCol>0.5</Styles.TableCol>
                <Styles.TableCol>Infant</Styles.TableCol>
                <Styles.TableCol>This could take about a few hours or so</Styles.TableCol>
              </Styles.TableRow>
              <Styles.TableRow>
                <Styles.TableCol>1</Styles.TableCol>
                <Styles.TableCol>Extra Small</Styles.TableCol>
                <Styles.TableCol>This could take about a day</Styles.TableCol>
              </Styles.TableRow>
              <Styles.TableRow>
                <Styles.TableCol>2</Styles.TableCol>
                <Styles.TableCol>Small</Styles.TableCol>
                <Styles.TableCol>This could take a couple of days</Styles.TableCol>
              </Styles.TableRow>
              <Styles.TableRow>
                <Styles.TableCol>3</Styles.TableCol>
                <Styles.TableCol>Medium</Styles.TableCol>
                <Styles.TableCol>This could take 2-3 days</Styles.TableCol>
              </Styles.TableRow>
              <Styles.TableRow>
                <Styles.TableCol>5</Styles.TableCol>
                <Styles.TableCol>Large</Styles.TableCol>
                <Styles.TableCol>This could take about week or so</Styles.TableCol>
              </Styles.TableRow>
              <Styles.TableRow>
                <Styles.TableCol>8</Styles.TableCol>
                <Styles.TableCol>Extra Large</Styles.TableCol>
                <Styles.TableCol>This could take a full sprint (break your issues down)</Styles.TableCol>
              </Styles.TableRow>
              <Styles.TableRow>
                <Styles.TableCol>?</Styles.TableCol>
                <Styles.TableCol>N/A</Styles.TableCol>
                <Styles.TableCol>Unsure of estimate, does not meet Definition of Ready, or have a question</Styles.TableCol>
              </Styles.TableRow>
            </Styles.TableBody>
          </Styles.Table>
        </Styles.DialogContent>
      </Styles.DialogPortal>
    </Styles.DialogRoot>
  )

  return (
    <>
      <Styles.DropdownMenuRoot modal={false}>
        <Styles.DropdownMenuTrigger asChild>
          <Styles.IconButton aria-label="Quick Menu">
            <Icon name="list" size={16} />
          </Styles.IconButton>
        </Styles.DropdownMenuTrigger>

        <Styles.DropdownMenuPortal>
          <Styles.DropdownMenuContent sideOffset={5}>
            <Styles.DropdownMenuLabel>Discovery</Styles.DropdownMenuLabel>
            <Styles.DropdownMenuSeparator />
            <Styles.DropdownMenuItem onClick={() => router.push(paths.newGame)}>
              Create Planning Poker Game
            </Styles.DropdownMenuItem>
            <Styles.DropdownMenuItem onClick={() => router.push(paths.games)}>
              View Existing Games
            </Styles.DropdownMenuItem>
            { router.pathname.includes('game/') && (
              <>
                <Styles.DropdownMenuItem onClick={() => null}>
                  <IssueTrigger setOpen={props.setOpen} onclick={() => props.setOpen(true)} />
                </Styles.DropdownMenuItem>
                <Styles.DropdownMenuItem onClick={() => null}>
                  <GuideTrigger />
                </Styles.DropdownMenuItem>
              </>
            )}
            <Styles.DropdownMenuSeparator />
            <Styles.DropdownMenuLabel>Delivery</Styles.DropdownMenuLabel>
            <Styles.DropdownMenuSeparator />
            <Styles.DropdownMenuItem onClick={() => router.push(paths.newTeam)}>
              Create New Team
            </Styles.DropdownMenuItem>
            <Styles.DropdownMenuItem onClick={() => router.push(paths.teams)}>
              View Teams
            </Styles.DropdownMenuItem>
            <Styles.DropdownMenuArrow />
          </Styles.DropdownMenuContent>
        </Styles.DropdownMenuPortal>
      </Styles.DropdownMenuRoot>
      <Guide />
    </>
  )
}
