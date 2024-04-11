import { chainList } from '@/constants/chain'
import { getBalance, getChainId } from '@/redux/features/wallet-slice'
import { useAppSelector } from '@/redux/hooks'
import { Box, Typography } from '@mui/material'

type Props = {}

const AccountBalance = (props: Props) => {
  const balance = useAppSelector(getBalance)
  const chainId = useAppSelector(getChainId)

  const symbol = chainList.find(item => item.chainId === chainId)?.symbol
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: '0.5rem'
      }}
    >
      <Typography variant='h5'>{balance}</Typography>
      <Typography variant='h6'>{symbol}</Typography>
    </Box>
  )
}

export default AccountBalance
