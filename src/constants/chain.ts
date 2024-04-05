const chainList: {
  name: string
  icon: string
  websiteUrl: string
  network: string
  rpcUrl: string
  chainIdNum: number
  chainId: number
  blockExplorerUrl: string
  explorerName: string
  symbol: string
}[] = [
  {
    name: 'Ethereum',
    icon: 'https://static.coinstats.app/coins/1650455629727.png',
    websiteUrl: 'https://www.ethereum.org/',
    network: 'Mainnet',
    rpcUrl: 'https://eth.llamarpc.com',
    chainIdNum: 1,
    chainId: 0x1,
    blockExplorerUrl: 'https://etherscan.io',
    explorerName: 'Etherscan',
    symbol: 'ETH'
  },
  {
    name: 'Sepolia Testnet',
    icon: 'https://static.coinstats.app/coins/1650455629727.png',
    websiteUrl: 'https://sepolia.dev',
    network: 'Testnet',
    rpcUrl: 'https://rpc.sepolia.org',
    chainIdNum: 11155111,
    chainId: 0xaa36a7,
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    explorerName: 'Etherscan',
    symbol: 'ETH'
  },
  {
    name: 'BNB',
    icon: 'https://static.coinstats.app/coins/1666608145347.png',
    websiteUrl: 'https://www.binance.com',
    network: 'Mainnet',
    rpcUrl: 'https://opbnb-rpc.publicnode.com',
    chainIdNum: 56,
    chainId: 0x38,
    blockExplorerUrl: 'https://explorer.bnbchain.org/',
    explorerName: 'BscScan',
    symbol: 'BNB'
  },
  {
    name: 'BNB Testnet',
    icon: 'https://static.coinstats.app/coins/1666608145347.png',
    websiteUrl: 'https://www.binance.com',
    network: 'Testnet',
    rpcUrl: 'https://bsc-testnet.drpc.org',
    chainIdNum: 97,
    chainId: 0x61,
    blockExplorerUrl: 'https://testnet.bscscan.com',
    explorerName: 'BscScan',
    symbol: 'tBNB'
  }
]
export { chainList }
