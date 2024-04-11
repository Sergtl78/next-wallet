import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type WalletState = {
  accounts: string[]
  balance: string
  chainId: string
  error: string
  isError: boolean
  isLoading: boolean
  isConnect: boolean
  isConnecting: boolean
  txHash?: string
  receiptHash?: string
}
export const initialWalletState: WalletState = {
  accounts: [''],
  balance: '',
  chainId: '',
  error: '',
  isError: false,
  isLoading: false,
  isConnect: false,
  isConnecting: false,
  txHash: undefined,
  receiptHash: undefined
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialWalletState,
  selectors: {
    getWallet: (state: WalletState) => state,
    walletError: (state: WalletState) => state.error,
    walletIsError: (state: WalletState) => state.isError,
    walletIsConnect: (state: WalletState) => state.isConnect,
    getAccounts: (state: WalletState) => state.accounts,
    getBalance: (state: WalletState) => state.balance,
    getChainId: (state: WalletState) => state.chainId,
    getTxHash: (state: WalletState) => state.txHash,
    getReceiptHash: (state: WalletState) => state.receiptHash
  },

  reducers: {
    setWallet(state, action: PayloadAction<WalletState>) {
      state = action.payload
    },
    setAccounts(state, action: PayloadAction<string[]>) {
      state.accounts = action.payload
    },
    setBalance(state, action: PayloadAction<string>) {
      state.balance = action.payload
    },
    setChainId(state, action: PayloadAction<string>) {
      state.chainId = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload

      if (!action.payload) {
        state.isError = false
      }
      if (action.payload) {
        state.isError = true
      }
    },
    resetError(state) {
      state.error = ''
      state.isError = false
    },
    setIsConnect(state, action: PayloadAction<boolean>) {
      state.isConnect = action.payload
    },
    setIsConnecting(state, action: PayloadAction<boolean>) {
      state.isConnecting = action.payload
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setTxHash(state, action: PayloadAction<string>) {
      state.txHash = action.payload
    },
    setReceiptHash(state, action: PayloadAction<string>) {
      state.receiptHash = action.payload
    },
    resetWallet(state) {
      state = initialWalletState
    }
  }
})

export const { actions: walletActions, reducer: walletReducer } = walletSlice
export const {
  getWallet,
  getAccounts,
  getBalance,
  getChainId,
  walletError,
  walletIsError,
  walletIsConnect,
  getTxHash,
  getReceiptHash
} = walletSlice.selectors
