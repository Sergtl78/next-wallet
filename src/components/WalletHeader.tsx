'use client'
import { provider } from '@/hooks/useProvider'
import { getAccounts, walletActions } from '@/redux/features/wallet-slice'
import { useActionCreators, useAppSelector } from '@/redux/hooks'
import { formatAddress } from '@/utils/utils'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, Button } from '@mui/material'
type Props = {}

const WalletHeader = (props: Props) => {
  const action = useActionCreators(walletActions)
  const accounts = useAppSelector(getAccounts)
  console.log('provider', provider())

  const disconnectWallet = async () => {
    await provider()?.send('wallet_revokePermissions', [
      {
        eth_accounts: {}
      }
    ])
    action.setIsConnect(false)
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
        onClick={disconnectWallet}
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
