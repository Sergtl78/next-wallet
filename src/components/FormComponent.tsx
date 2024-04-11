'use client'
import { chainList } from '@/constants/chain'
import { useProvider } from '@/hooks/useProvider'
import {
  getAddress,
  getAmount,
  getErrorAddress,
  getErrorAmount,
  getIsLoading
} from '@/redux/features/form-slice'
import {
  getChainId,
  getReceiptHash,
  getTxHash
} from '@/redux/features/wallet-slice'
import { useAppSelector, useFormActions, useWalletActions } from '@/redux/hooks'
import { formatError } from '@/utils/utils'
import { Button, Stack, TextField } from '@mui/material'
import { ethers } from 'ethers'
import Link from 'next/link'
import { ZodIssue, z } from 'zod'

//prettier-ignore
const regex = new RegExp('^[+-]?([0-9]{1,})[.,]([0-9]{1,})$')
const AmountSchema = z.string().regex(regex, {
  message: 'Не правильное значение.Например: 0.1 или 1,0 0,01'
})
const AddressSchema = z.string().refine(value => ethers.isAddress(value), {
  message: 'Не правильный адрес.'
})
type ZodError = Error & {
  issues: ZodIssue[]
}

const FormComponent = () => {
  const actionsWallet = useWalletActions()
  const actions = useFormActions()
  const amount = useAppSelector(getAmount)
  const address = useAppSelector(getAddress)
  const chainId = useAppSelector(getChainId)
  const errorAmount = useAppSelector(getErrorAmount)
  const errorAddress = useAppSelector(getErrorAddress)
  const isLoading = useAppSelector(getIsLoading)
  const txHash = useAppSelector(getTxHash)
  const receiptHash = useAppSelector(getReceiptHash)

  const mask = useProvider()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const resAmount = AmountSchema.safeParse(amount)
    if (!resAmount.success) {
      const errorZod = resAmount.error
      actions.setErrorAmount(errorZod.errors[0].message)
    }
    const resAddress = AddressSchema.safeParse(address)
    if (!resAddress.success) {
      const errorZod = resAddress.error
      actions.setErrorAddress(errorZod.errors[0].message)
    }

    if (resAmount.success && resAddress.success) {
      actions.setIsLoading(true)
      try {
        await mask?.sendTransaction({
          amount,
          address
        })
      } catch (err: any) {
        actionsWallet.setError(formatError(err))
      } finally {
        actions.setIsLoading(false)
      }
    }
  }
  const scanName = chainList.find(
    item => item.chainId === chainId
  )?.explorerName
  const scanUrl = chainList.find(
    item => item.chainId === chainId
  )?.blockExplorerUrl
  return (
    <form style={{ width: '100%' }} onSubmit={event => handleSubmit(event)}>
      <Stack spacing={2} direction='column' sx={{ mb: '1rem', mt: '1rem' }}>
        <TextField
          helperText={errorAmount}
          error={!!errorAmount}
          type='text'
          variant='filled'
          color='secondary'
          label='Amount'
          onChange={e => actions.setAmount(e.target.value)}
          //value={amount}
          fullWidth
          required
        />
        <TextField
          helperText={errorAddress}
          error={!!errorAddress}
          type='text'
          variant='filled'
          color='secondary'
          label='Address'
          onChange={e => actions.setAddress(e.target.value)}
          //value={address}
          fullWidth
          required
        />
        <Button
          disabled={isLoading}
          variant='contained'
          color={isLoading ? 'warning' : 'secondary'}
          type='submit'
        >
          Send
        </Button>

        {receiptHash && (
          <Link href={`${scanUrl}/tx/${txHash}`}>
            See transaction on {scanName}
          </Link>
        )}
      </Stack>
    </form>
  )
}

export default FormComponent
