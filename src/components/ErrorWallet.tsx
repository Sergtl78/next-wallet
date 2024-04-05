'use client'
import { walletError } from '@/redux/features/wallet-slice'
import { useAppSelector } from '@/redux/hooks'
import { Box } from '@mui/material'

const ErrorWallet = () => {
  const error = useAppSelector(walletError)
  console.log('errorEEE', error)

  return (
    <Box
      sx={{
        mt: '1rem',
        color: 'error.main',
        textAlign: 'center',
        padding: '1rem',
        width: '100%',
        border: '1px solid',
        borderColor: 'error.main',
        borderRadius: '0.5rem'
      }}
    >
      ⛔ {error}
    </Box>
  )
}

export default ErrorWallet
