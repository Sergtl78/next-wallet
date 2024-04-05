'use client'
import theme from '@/utils/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import StoreProvider from './StoreProvider'

type Props = {
  children: React.ReactNode
}

const AppProviders = ({ children }: Props) => {
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StoreProvider>{children}</StoreProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default AppProviders
