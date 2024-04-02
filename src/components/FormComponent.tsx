'use client'
import { Button, Stack, TextField } from '@mui/material'
import { ethers } from 'ethers'
import { useState } from 'react'
import { ZodIssue, z } from 'zod'

type Props = {}

//prettier-ignore
const regex = new RegExp('^[+-]?([0-9]{1,})[.,]([0-9]{1,})$')
const FormSchema = z.object({
  amount: z.string().regex(regex, {
    message: 'Не правильное значение.Например: 0.1 или 1,0 0,01'
  }),
  address: z.string().refine(value => ethers.isAddress(value), {
    message: 'Не правильный адрес.'
  })
})
type ZodError = Error & {
  issues: ZodIssue[]
}
type FormData = z.infer<typeof FormSchema>

const FormComponent = (props: Props) => {
  const [sendData, setSendData] = useState<FormData>({
    amount: '',
    address: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<{ amount: boolean; address: boolean }>(
    { amount: false, address: false }
  )
  const [error, setError] = useState<{ amount: string; address: string }>({
    amount: '',
    address: ''
  })

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    submission: FormData
  ) => {
    event.preventDefault()
    setError({ amount: '', address: '' })
    setIsError({ amount: false, address: false })
    setIsLoading(true)
    const results = FormSchema.safeParse(submission)
    if (!results.success) {
      const errorZod = results.error.format()

      setIsLoading(false)
      setError({
        amount: errorZod.amount?._errors[0] || '',
        address: errorZod.address?._errors[0] || ''
      })
      setIsError({
        amount: !!errorZod.amount?._errors[0],
        address: !!errorZod.address?._errors[0]
      })
    } else {
      setIsLoading(false)
      setIsError({ amount: false, address: false })
      setError({ amount: '', address: '' })

      console.log(results.data)
    }
  }
  return (
    <form onSubmit={event => handleSubmit(event, sendData)}>
      <Stack spacing={2} direction='column' sx={{ mb: '1rem', mt: '1rem' }}>
        <TextField
          helperText={error.amount}
          error={isError.amount}
          type='text'
          variant='filled'
          color='secondary'
          label='Amount'
          onChange={e => setSendData({ ...sendData, amount: e.target.value })}
          value={sendData.amount}
          //defaultValue={''}
          fullWidth
          required
        />
        <TextField
          helperText={error.address}
          error={isError.address}
          type='text'
          variant='filled'
          color='secondary'
          label='Address'
          onChange={e => setSendData({ ...sendData, address: e.target.value })}
          value={sendData.address}
          fullWidth
          required
        />
        <Button
          disabled={isLoading}
          variant='contained'
          color='secondary'
          type='submit'
        >
          Send
        </Button>
      </Stack>
    </form>
  )
}

export default FormComponent
