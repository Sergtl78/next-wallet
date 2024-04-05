import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FormState = {
  amount: string
  address: string

  errorAmount: string
  isErrorAmount: boolean

  errorAddress: string
  isErrorAddress: boolean

  isLoading: boolean
}
export const initialFormState: FormState = {
  amount: '',
  address: '',
  errorAmount: '',
  isErrorAmount: false,
  errorAddress: '',
  isErrorAddress: false,
  isLoading: false
}

export const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  selectors: {
    getForm: (state: FormState) => state
  },
  reducers: {
    setForm(state, action: PayloadAction<FormState>) {
      state = action.payload
    }
  }
})

export const { actions: formActions, reducer: formReducer } = formSlice
export const { getForm } = formSlice.selectors
