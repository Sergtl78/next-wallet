export const formatAddress = (address: string) => {
  if (!address) return
  return `${address.slice(0, 6)} ... ${address.slice(-4)}`
}

export const formatError = (err: any) => {
  console.log('err', err)
  if (err.code === 4001) {
    return 'Please Connect Your Wallet'
  }
  if (err.code === -32002 || err.error?.code === -32002) {
    return 'Please Enter Your Wallet'
  }
  if (err.code === ('ACTION_REJECTED' || 4001) || err.error?.code === 4001) {
    return 'Transaction Rejected'
  }

  return 'Something went wrong'
}
