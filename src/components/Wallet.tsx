'use client'
import { chainList } from '@/constants/chain'
import { Box, Button, Chip, Paper, Typography } from '@mui/material'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import ErrorComponent from './ErrorComponent'
import FormComponent from './FormComponent'

type WalletData = {
  accounts: string[]
  balance: string
  chainId: string
}
const initialWalletData: WalletData = {
  accounts: [],
  balance: '',
  chainId: ''
}
const Wallet = () => {
  const [error, setError] = useState<string>('')
  const [wallet, setWallet] = useState<WalletData>(initialWalletData)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnect, setIsConnect] = useState(false)

  const updateAccounts = async (accounts?: string[]) => {
    const selectedAccounts =
      accounts ||
      (await window.ethereum?.request({
        method: 'eth_requestAccounts'
      }))

    if (selectedAccounts.length === 0) {
      setWallet(initialWalletData)
      return
    }
    const provider = new ethers.BrowserProvider(window.ethereum)
    const balance = await provider.getBalance(selectedAccounts[0])
    const chainId = (await provider.getNetwork()).chainId

    if (Number(chainId) !== 11155111)
      setError('Please connect to Sepolia network')
    setWallet({
      accounts: selectedAccounts,
      balance: ethers.formatEther(balance),
      chainId: chainId.toString()
    })
  }

  const handleChangeAccount = useCallback(
    async ({ accounts }: { accounts: string[] }) => {
      await updateAccounts(accounts)
      if (accounts?.length === 0) {
        setIsConnect(false)
      } else {
        setIsConnect(true)
      }
    },
    []
  )

  const handleChangeChain = useCallback(async (chainId: string) => {
    window.location.reload()
    updateAccounts()
  }, [])

  useEffect(() => {
    if (!window.ethereum) return
    /* const isMetamask = window.ethereum.isMetaMask ?? false
    if (!isMetamask) {
      setError('Please install Metamask')
      return
    } */
    const getConnect = async () => {
      const accounts = await window.ethereum?.request({
        method: 'eth_accounts'
      })
      if (accounts?.length === 0) {
        setIsConnect(false)
      } else {
        setIsConnect(true)
      }
      updateAccounts(accounts)
    }
    getConnect()

    window.ethereum?.on('accountsChanged', handleChangeAccount)

    window.ethereum?.on('chainChanged', handleChangeChain)

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleChangeAccount)

      window.ethereum?.removeListener('chainChanged', handleChangeChain)
    }
  }, [handleChangeAccount, handleChangeChain])
  const connect = async () => {
    setIsConnecting(true)
    try {
      await window.ethereum?.request({
        method: 'eth_requestAccounts'
      })
      setError('')
      updateAccounts()
    } catch (error: any) {
      setError(error.message)
    }
    setIsConnecting(false)
  }
  const name = chainList[wallet.chainId]?.name
  const symbol = chainList[wallet.chainId]?.symbol
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

          flexDirection: 'column'
        }}
      >
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
          <Chip
            label={wallet.accounts[0]}
            color='secondary'
            sx={{ mb: '1rem', width: 'fit-content' }}
          />
          <Typography variant='h4'>{name}</Typography>
          <Typography variant='h4'>{wallet.balance + ' ' + symbol}</Typography>
        </Box>

        {!isConnect && (
          <Button
            disabled={isConnecting}
            onClick={connect}
            variant='contained'
            color='primary'
            sx={{ width: '100%', borderRadius: '0.5rem' }}
          >
            🦊 Connect
          </Button>
        )}
        <FormComponent />
        {isConnect && (
          <Button
            //onClick={connect}
            variant='contained'
            color='primary'
            sx={{ width: '100%', borderRadius: '0.5rem' }}
          >
            🦊 Disconnect
          </Button>
        )}
        {error && <ErrorComponent message={error} />}
      </Paper>
    </Box>
  )
}

export default Wallet
