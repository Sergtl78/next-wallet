import { configureStore } from '@reduxjs/toolkit'
import { formReducer } from './features/form-slice'
import { walletReducer } from './features/wallet-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      form: formReducer,
      wallet: walletReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
