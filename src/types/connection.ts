import { ethers } from 'ethers'

export type CurrentConnection = {
  provider: ethers.BrowserProvider
  signer: ethers.Signer
}
