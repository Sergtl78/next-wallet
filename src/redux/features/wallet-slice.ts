import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    accounts: [''],
    balance: '',
    chainId: '',
    error: '',
    isError: false,
    isLoading: false,
    isConnect: false
  },
  reducers: {
    setWallet(state, action) {
      state.accounts = action.payload.accounts
      state.balance = action.payload.balance
    }
  }
})

export const { actions: walletActions, reducer: walletReducer } = walletSlice
