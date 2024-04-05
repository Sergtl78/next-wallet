import { chainList } from '@/constants/chain'
import { Box, Button } from '@mui/material'

type Props = {
  currentChainId: string
}

const CheckNetwork = ({ currentChainId }: Props) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {chainList.map(item => {
        return (
          <Button
            variant={
              Number(currentChainId) === item.chainId ? 'contained' : 'text'
            }
            key={item.chainId}
          >
            {item.name}
          </Button>
        )
      })}
    </Box>
  )
}

export default CheckNetwork
