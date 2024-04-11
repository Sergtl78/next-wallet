import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FormState = {
  amount: string
  address: string
  errorAmount: string
  errorAddress: string
  isLoading: boolean
}
export const initialFormState: FormState = {
  amount: '',
  address: '',
  errorAmount: '',
  errorAddress: '',
  isLoading: false
}

export const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  selectors: {
    getForm: (state: FormState) => state,
    getAmount: (state: FormState) => state.amount,
    getAddress: (state: FormState) => state.address,
    getErrorAmount: (state: FormState) => state.errorAmount,
    getErrorAddress: (state: FormState) => state.errorAddress,
    getIsLoading: (state: FormState) => state.isLoading
  },
  reducers: {
    setForm(state, action: PayloadAction<FormState>) {
      state = action.payload
    },
    setAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload
    },
    setErrorAmount(state, action: PayloadAction<string>) {
      state.errorAmount = action.payload
    },
    setErrorAddress(state, action: PayloadAction<string>) {
      state.errorAddress = action.payload
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    resetForm(state) {
      state = initialFormState
    }
  }
})

export const { actions: formActions, reducer: formReducer } = formSlice
export const {
  getForm,
  getAmount,
  getAddress,
  getErrorAmount,
  getErrorAddress,
  getIsLoading
} = formSlice.selectors
