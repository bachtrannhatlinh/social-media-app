'use client'

import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector as <T>(selector: (state: RootState) => T) => T
export const useAppStore = () => useStore<AppStore>()