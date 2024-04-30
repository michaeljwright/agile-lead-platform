import { useState } from 'react'
import { Button, Box, Icon, TextArea } from 'components/common'
import { Menu, Select } from './components'
import * as Styles from './styles'
import { IssueItemProps, IssueFormData } from './types'
import Linkify from 'react-linkify'
import Link from 'next/link'
import { useGame } from 'context/game'
import { useForm } from 'react-hook-form'

export function IssueItem (props: IssueItemProps) {
  const {
    label,
    active,
    index,
    onActiveChange,
    onValueChange,
    onDelete,
    value
  } = props
  const { onChangeIssueValue } = useGame()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [textValue, setTextValue] = useState<string>(label)

  const handleEdit = (e: any) => {
    setTextValue(e.target.value)
  }

  const {
    handleSubmit,
    reset
  } = useForm<IssueFormData>()

  const onSubmit = async () => {
    await onChangeIssueValue(index, textValue)
    setIsEditing(false)
    reset()
  }

  return (
    <Styles.Container active={active}>
      <Box flexDirection="column" gap={1}>
        <Styles.Label>
          {(!isEditing && (
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <Link target="blank" href={decoratedHref} key={key}>
                  {decoratedText} <Icon name="externalLink" size={13} />
                </Link>
              )}>
              {label}
            </Linkify>
          )) || (
            <Styles.Form onSubmit={handleSubmit(onSubmit)}>
              <TextArea
                rows={2}
                name={index}
                id={index}
                autoFocus
                value={textValue}
                onChange={handleEdit}
              />
              <Box gap={0.5}>
                <Button
                  type="button"
                  fullWidth
                  variant="letter"
                  onClick={() => setIsEditing(false)}
                >Cancel</Button>
                <Button fullWidth>Save</Button>
              </Box>
            </Styles.Form>
          )}
        </Styles.Label>
        <Box justifyContent="space-between">
          <Styles.Button
            onClick={onActiveChange}
            variant={active ? 'primary' : 'letter'}
          >{
              active ? 'Voting now...' : 'Vote this issue'
            }</Styles.Button>
          <Select
            value={value}
            onValueChange={onValueChange}
          />
          <Menu setIsEditing={setIsEditing} onDelete={onDelete}>
            <Icon name="threeDotsVertical" />
          </Menu>
        </Box>
      </Box>
    </Styles.Container>
  )
}
