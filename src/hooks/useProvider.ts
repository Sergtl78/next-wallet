import { chainList } from '@/constants/chain'
import {
  initialWalletState,
  walletActions
} from '@/redux/features/wallet-slice'
import { useActionCreators } from '@/redux/hooks'
import { formatError } from '@/utils/utils'
import { ethers, parseEther } from 'ethers'
import { useRef } from 'react'

export const useProvider = () => {
  const actions = useActionCreators(walletActions)
  const providerRef = useRef<ethers.BrowserProvider>()
  if (typeof window === 'undefined') {
    providerRef.current = undefined
    return
  }
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    actions.setError('Please Install Metamask')
    providerRef.current = undefined
    return
  }

  providerRef.current = new ethers.BrowserProvider(window.ethereum, 'any')
  const provider = providerRef.current

  const updateAccount = async () => {
    if (!provider) return
    actions.setIsLoading(true)
    try {
      const accounts = (await provider.send(
        'eth_requestAccounts',
        []
      )) as string[]
      const balance = await provider.getBalance(accounts[0])
      const network = await provider.getNetwork()

      actions.setIsConnect(true)
      actions.resetError()
      actions.setAccounts(accounts)
      actions.setBalance(ethers.formatEther(balance))
      actions.setChainId(ethers.toBeHex(network.chainId))
      actions.setIsLoading(false)
    } catch (error) {
      console.log(error)
      actions.setIsConnect(false)
      actions.setWallet({ ...initialWalletState, isError: true })
      actions.setError('Please connect your wallet')
      actions.setIsLoading(false)
    }
  }
  const changeNetwork = async (chainId: string) => {
    console.log('chainIdCCC', chainId)
    window.location.reload()
    if (!provider) return
    try {
      await provider.send('wallet_switchEthereumChain', [
        {
          chainId
        }
      ])
      await updateAccount()
    } catch (error) {
      console.log(error)
      actions.setError('Please connect your wallet')
    }
  }
  const sendTransaction = async ({
    amount,
    address
  }: {
    amount: string
    address: string
  }) => {
    if (!provider) return
    try {
      actions.setIsLoading(true)
      actions.resetError()
      try {
        const signer = await provider.getSigner()
        const tx = await signer.sendTransaction({
          to: address,
          value: parseEther(amount)
        })
        actions.setTxHash(tx.hash)
        const receipt = await tx.wait()

        receipt?.hash && actions.setReceiptHash(receipt.hash)
        updateAccount()
      } catch (error: any) {
        actions.setError(formatError(error))
      } finally {
        actions.setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      actions.setError(formatError(error))
    }
  }
  const disconnectWallet = async () => {
    try {
      await provider.send('wallet_revokePermissions', [
        {
          eth_accounts: {}
        }
      ])
      actions.resetWallet()
    } catch (error) {
      console.log(error)
    }
    window.location.reload()
    actions.resetWallet()
  }
  const checkNetwork = async () => {
    if (!provider) return false
    const network = await provider.getNetwork()
    const chainId = ethers.toBeHex(network.chainId)

    const chainIdTestnetList = chainList.map(item =>
      item.network === 'Testnet' ? item.chainId : null
    )
    const isTestnet = chainIdTestnetList.includes(chainId)

    if (!isTestnet) {
      actions.resetWallet()
      actions.setIsConnect(false)
      actions.setError('Network not supported')

      return false
    }
    actions.resetError()
    return true
  }
  return {
    provider,
    changeNetwork,
    updateAccount,
    sendTransaction,
    disconnectWallet,
    checkNetwork
  }
}
