'use client'
import { createTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily
  },

  palette: {
    mode: 'light',
    primary: {
      main: '#a12aba'
    },
    secondary: {
      main: '#44ba2a',
      contrastText: '#fff'
    },
    /* error: {
      main: '#f44336',
      contrastText: '#fff'
    }, */
    background: {
      default: '#f5f5f5'
    }
  }
})

export default theme
