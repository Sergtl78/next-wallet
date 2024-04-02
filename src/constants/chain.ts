const CHAIN_SET = new Set()
CHAIN_SET.add({
  '11155111': {
    name: 'Sepolia',
    rpcUrl: 'https://rpc.sepolia.org',
    chainId: '11155111',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    explorerName: 'Etherscan',
    symbol: 'ETH'
  }
})
const chainList: {
  [k: string]: {
    name: string
    rpcUrl: string
    chainId: string
    blockExplorerUrl: string
    explorerName: string
    symbol: string
  }
} = {
  11155111: {
    name: 'Sepolia',
    rpcUrl: 'https://rpc.sepolia.org',
    chainId: '11155111',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    explorerName: 'Etherscan',
    symbol: 'ETH'
  }
}
export { CHAIN_SET, chainList }
