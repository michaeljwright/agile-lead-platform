import { Box, Button, TextArea } from 'components/common'
import { useSprint } from 'context/sprint'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Styles from './styles'
import { AddWasteProps, WasteFormData } from './types'
import Select from 'react-select'

export function AddWaste (props: AddWasteProps) {
  const {
    sprint,
    createWaste
  } = useSprint()

  const {
    register,
    handleSubmit,
    reset
  } = useForm<WasteFormData>()

  const selectOptions = [
    { value: 'meetings', label: 'Meetings' },
    { value: 'support', label: 'Support' },
    { value: 'discussion', label: 'Discussion' },
    { value: 'learning', label: 'Learning' },
    { value: 'knowledge', label: 'Knowledge' },
    { value: 'random', label: 'Random' },
    { value: 'waiting', label: 'Waiting' },
    { value: 'defects', label: 'Defects' }
  ]

  const [isEdditing, setIsEditting] = useState<boolean>(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const renderForm = () => {
    if (!isEdditing) {
      return (
        <Button
          type="button"
          fullWidth
          onClick={() => setIsEditting(true)}
        >Feed the Waste Snake</Button>
      )
    }

    const handleChange = (e: any) => {
      setSelectedOptions(Array.isArray(e) ? e.map(x => x.value) : [])
    }

    const onSubmit = async (data: WasteFormData) => {
      if (!sprint?.id) return

      await createWaste({
        name: data.name,
        type: selectedOptions
      })

      setIsEditting(false)
      reset()
    }

    return (
      <Styles.Form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          name="name"
          register={register('name')}
          autoFocus
          placeholder="Enter a description of the waste you experienced"
        />
        <Select
          name="type"
          onChange={handleChange}
          value={selectOptions.filter(obj => selectedOptions.includes(obj.value))}
          placeholder="Choose a waste type"
          options={selectOptions}
          menuPlacement="top"
          isMulti
          isClearable
        />
        <Box gap={0.5}>
          <Button
            type="button"
            fullWidth
            variant="letter"
            onClick={() => setIsEditting(false)}
          >Cancel</Button>
          <Button fullWidth>Save</Button>
        </Box>
      </Styles.Form>
    )
  }

  return (
    <Styles.Container>
      {renderForm()}
    </Styles.Container>
  )
}
