'use client'
import { useProvider } from '@/hooks/useProvider'
import {
  getChainId,
  walletActions,
  walletIsConnect,
  walletIsError
} from '@/redux/features/wallet-slice'
import { useActionCreators, useAppSelector } from '@/redux/hooks'
import { Box, Paper } from '@mui/material'
import { useEffect } from 'react'
import AccountBalance from './AccountBalance'
import ErrorComponent from './ErrorWallet'
import FormComponent from './FormComponent'
import Initial from './Initial'
import SelectNetwork from './SelectNetwork'
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
  const mask = useProvider()

  useEffect(() => {
    if (!window.ethereum) return
    const handleChainChanged = async (chainId: string) => {
      //window.location.reload()
      const isAvailable = await mask?.checkNetwork()
      if (!isAvailable) return
      await mask?.updateAccount()
    }
    const handleAccountsChanged = async () => {
      await mask?.updateAccount()
    }
    const handleDisconnect = () => {
      action.resetWallet()
    }
    const handleConnect = async () => {
      const isAvailable = await mask?.checkNetwork()
      if (isAvailable) return
      await mask?.updateAccount()
    }
    /* const provider = new ethers.providers.Web3Provider(window.ethereum, 'any') */
    mask?.provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload()
      }
    })
    window.ethereum.on('chainChanged', handleChainChanged)
    window.ethereum.on(`accountsChanged`, handleAccountsChanged)
    window.ethereum.on('disconnect', handleDisconnect)
    window.ethereum.on('connect', handleConnect)

    return () => {
      mask?.provider.off('network')
      window.ethereum.removeListener('chainChanged', handleChainChanged)
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [action, mask])

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
            <SelectNetwork currentChainId={chainId} />
            <AccountBalance />
            <FormComponent />
          </Box>
        )}

        {isError && <ErrorComponent />}
      </Paper>
    </Box>
  )
}

export default Wallet
