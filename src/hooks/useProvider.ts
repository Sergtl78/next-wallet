import { ethers } from 'ethers'
export const provider = () => {
  if (!window.ethereum) return null

  const ethereum = window.ethereum
  return new ethers.BrowserProvider(ethereum)
}
