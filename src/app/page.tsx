import Wallet from '@/components/Wallet'
import { Container } from '@mui/material'

export default function Home() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        
      }}
    >
      <Wallet />
    </Container>
  )
}
