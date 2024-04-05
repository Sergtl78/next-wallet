'use client'
import { walletActions } from '@/redux/features/wallet-slice'
import { useActionCreators } from '@/redux/hooks'
import { Box, Button } from '@mui/material'
import { ethers } from 'ethers'
import Logo from './Logo'

type Props = {}

const Initial = (props: Props) => {
  const actions = useActionCreators(walletActions)

  const connectWallet = async () => {
    if (!window.ethereum) {
      actions.setError('No Wallet Found. Please Install Metamask')
    }
    const accounts = await window.ethereum
      .request({
        method: 'eth_requestAccounts'
      })
      .catch((err: { code: number }) => {
        if (err.code === 4001) {
          actions.setError('Please Connect Your Wallet')
        }
        if (err.code === -32002) {
          actions.setError('Please Enter Your Wallet')
        }
      })
    actions.setAccounts(accounts)
    actions.setIsConnect(true)

    
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        mb: '1rem'
      }}
    >
      <Logo style={{ width: '100%', height: '100%' }} />
      <Button
        //disabled={isConnecting}
        onClick={connectWallet}
        variant='contained'
        color='primary'
        sx={{ width: '100%', borderRadius: '0.5rem' }}
      >
        🦊 Connect
      </Button>
    </Box>
  )
}

export default Initial
