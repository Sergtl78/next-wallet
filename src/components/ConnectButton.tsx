'use client'
import { useProvider } from '@/hooks/useProvider'
import { getIsLoading } from '@/redux/features/form-slice'
import { walletActions } from '@/redux/features/wallet-slice'
import { useActionCreators, useAppSelector } from '@/redux/hooks'
import { formatError } from '@/utils/utils'
import { Box, Button } from '@mui/material'

export const ConnectButton = () => {
  const actions = useActionCreators(walletActions)
  const isLoading = useAppSelector(getIsLoading)
  const mask = useProvider()
  const provider = mask?.provider
  const handleConnect = async () => {
    actions.setIsLoading(true)
    if (!provider) return
    const accounts = (await provider
      .send('eth_requestAccounts', [])
      .catch((err: { code: number }) => {
        actions.setError(formatError(err))
        actions.setIsConnect(false)
      })) as string[]

    if (accounts && accounts.length > 0 && provider) {
      actions.resetError()
      const isAvailable = await mask.checkNetwork()
      if (isAvailable) await mask.updateAccount()
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          mb: '1rem',
          gap: '1rem'
        }}
      >
        <Button
          disabled={isLoading}
          variant='contained'
          color='primary'
          sx={{ width: '100%', borderRadius: '0.5rem', gap: '1rem' }}
          onClick={() => handleConnect()}
        >
          Connect
        </Button>
      </Box>
    </>
  )
}
