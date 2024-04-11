import {
  ActionCreator,
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators
} from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { formActions } from './features/form-slice'
import { walletActions } from './features/wallet-slice'
import type { AppDispatch, AppStore, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch()
  return useMemo(() => bindActionCreators(actions, dispatch), [])
}
// add type AsyncThunk
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key]
}

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>

export const useFormActions = () => {
  return useActionCreators(formActions)
}

export const useWalletActions = () => {
  return useActionCreators(walletActions)
}
