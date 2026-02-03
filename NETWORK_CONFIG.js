/**
 * Configurações da rede ARC Testnet
 * Baseado nas informações de https://chainlist.org/?testnets=true&search=arc
 */

const ARC_TESTNET_CONFIG = {
  name: 'Arc Testnet',
  chainId: 5042002, // 0x4cef52
  rpcUrls: [
    'https://rpc.testnet.arc.network',
    'https://arc-testnet.drpc.org',
    'wss://arc-testnet.drpc.org'
  ],
  nativeCurrency: {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18
  },
  blockExplorerUrls: [
    'https://explorer.testnet.arc.network'
  ],
  // Endereço do contrato USDC na rede ARC Testnet (a ser confirmado)
  usdcContractAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Este é o endereço do USDC na Sepolia, o da ARC precisa ser confirmado
  // Outros contratos importantes (a serem adicionados quando disponíveis)
  contracts: {
    swapRouter: null, // A ser implantado
    bridge: null      // A ser implantado
  }
};

module.exports = { ARC_TESTNET_CONFIG };