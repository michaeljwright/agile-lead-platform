import {
  Box,
  Icon,
  Typography
} from 'components/common'
import { AddIssue, IssueItem } from './component'
import * as Styles from './styles'
import { useGame } from 'context/game'
import { IssueProps } from './types'

export function Issue (props: IssueProps) {
  const {
    activeIssue,
    issues,
    onChangeActiveIssue,
    onChangeIssueVote,
    onRemoveIssue
  } = useGame()

  const points = issues
    .filter(issue => !!Number(issue.vote))
    .map(issue => Number(issue.vote))
    .reduce((prev, next) => prev + next, 0)

  const renderIssues = issues.map(issue =>
    <li key={issue.id}>
      <IssueItem
        index={issue.id}
        active={activeIssue?.id === issue.id}
        label={issue.value}
        onActiveChange={() => onChangeActiveIssue?.(issue.id)}
        value={issue?.vote || ''}
        onValueChange={(vote) => onChangeIssueVote(issue.id, vote)}
        onDelete={() => onRemoveIssue(issue.id)}
      />
    </li>
  )

  const renderIssueInfo = () => {
    if (issues.length === 0) return null

    return (
      <Box gap={1} marginTop={1}>
        <Typography>{`${issues.length} issues`}</Typography>
        <Typography>{`${points} points`}</Typography>
      </Box>
    )
  }

  return (
    <Styles.Root open={props.open}>
      <Styles.Portal>
        <Styles.Overlay onClick={() => props.setOpen(false)} />
        <Styles.Content>
          <Box fullWidth justifyContent="space-between" alignItems="center">
            <Typography as="strong" color="heading" size="md" fontWeight="400">Issues / Stories</Typography>
            <a onClick={() => props.setOpen(false)}>
              <Icon name="close" />
            </a>
          </Box>
          {renderIssueInfo()}
          <Styles.List>
            {renderIssues}
          </Styles.List>
          <AddIssue />
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}
