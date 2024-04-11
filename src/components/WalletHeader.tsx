'use client'

import { useProvider } from '@/hooks/useProvider'
import { getAccounts } from '@/redux/features/wallet-slice'
import { useAppSelector } from '@/redux/hooks'
import { formatAddress } from '@/utils/utils'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, Button } from '@mui/material'
type Props = {}

const WalletHeader = (props: Props) => {
  const accounts = useAppSelector(getAccounts)
  const mask = useProvider()
  const disconnect = async () => {
    await mask?.disconnectWallet()
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: '1rem'
      }}
    >
      <Button
        content={formatAddress(accounts[0])}
        endIcon={<ContentCopyIcon />}
        onClick={() => navigator.clipboard.writeText(accounts[0])}
        size='small'
        variant='contained'
        color='primary'
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '50rem'
        }}
      >
        {formatAddress(accounts[0])}
      </Button>
      <Button
        endIcon={<ContentCopyIcon />}
        onClick={disconnect}
        size='small'
        variant='outlined'
        color='primary'
        sx={{
          borderRadius: '50rem'
        }}
      >
        Disconnect
      </Button>
    </Box>
  )
}

export default WalletHeader
