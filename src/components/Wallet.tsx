'use client'
import {
  getChainId,
  walletActions,
  walletIsConnect,
  walletIsError
} from '@/redux/features/wallet-slice'
import { useActionCreators, useAppSelector } from '@/redux/hooks'
import { Box, Paper } from '@mui/material'
import { useEffect } from 'react'
import CheckNetwork from './CheckNetwork'
import ErrorComponent from './ErrorWallet'
import FormComponent from './FormComponent'
import Initial from './Initial'
import WalletHeader from './WalletHeader'

declare global {
  interface Window {
    ethereum: any
  }
}

const Wallet = () => {
  const action = useActionCreators(walletActions)
  const isError = useAppSelector(walletIsError)
  const isConnect = useAppSelector(walletIsConnect)
  const chainId = useAppSelector(getChainId)

  useEffect(() => {
    if (!window.ethereum) return

    window.ethereum.on('chainChanged', (chainId: string) => {
      action.setChainId(chainId)
      console.log('chainId', chainId)

      window.location.reload()
    })
    window.ethereum.on(`accountsChanged`, (accounts: string[]) => {
      action.setAccounts(accounts)
    })
    return () => {
      window.ethereum.removeListener('chainChanged', () => {})
      window.ethereum.removeListener('accountsChanged', () => {})
    }
  }, [action])

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        maxWidth: 'sm',
        padding: '1rem',
        minWidth: '360px',

        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        sx={{
          padding: '1rem',
          display: 'flex',
          width: '100%',
          borderRadius: '1rem',
          flexDirection: 'column'
        }}
      >
        {!isConnect ? (
          <Initial />
        ) : (
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
            <WalletHeader />
            <CheckNetwork currentChainId={chainId} />
            <FormComponent />
          </Box>
        )}

        {isError && <ErrorComponent />}
      </Paper>
    </Box>
  )
}

export default Wallet
