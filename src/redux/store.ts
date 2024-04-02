import {
  ActionCreator,
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { walletReducer } from './features/wallet-slice'

//-------add  /// <reference types="redux-persist" />   from    next-env.d.ts  -----------
const rootReducer = combineReducers({
  wallet: walletReducer
})

export const createStore = () =>
  configureStore({
    reducer: rootReducer,

    devTools: process.env.NODE_ENV !== 'production'
  })

type Store = ReturnType<typeof createStore>

export type RootState = ReturnType<Store['getState']>

export type AppDispatch = Store['dispatch']

//selectors
export const selectWallet = (state: RootState) => state.wallet

const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

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

/* export const useActionCreatorsTyped = <
  Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
}; */
