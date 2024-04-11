'use client'
import { Box } from '@mui/material'
import { ConnectButton } from './ConnectButton'
import Logo from './Logo'

type Props = {}

const Initial = (props: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        mb: '1rem'
      }}
    >
      <Logo style={{ width: '100%', height: '100%' }} />

      <ConnectButton />
    </Box>
  )
}

export default Initial
