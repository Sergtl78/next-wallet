import { Box } from '@mui/material'
type Props = {
  message: string
}

const ErrorComponent = ({ message }: Props) => {
  return (
    <Box
      onClick={() => window.location.reload()}
      sx={{
        mt: '1rem',
        color: 'error.main',
        textAlign: 'center',
        padding: '1rem',
        width: '100%',
        border: '1px solid',
        borderColor: 'error.main',
        borderRadius: '0.5rem'
      }}
    >
      ⚠️ {message} ⚠️
    </Box>
  )
}

export default ErrorComponent
