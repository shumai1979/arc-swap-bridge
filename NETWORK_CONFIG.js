/**
 * Configurações da rede ARC Testnet
 * Baseado nas informações de https://chainlist.org/?testnets=true&search=arc
 * Endereços USDC baseados em: https://developers.circle.com/stablecoins/usdc-contract-addresses
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
    'https://explorer.testnet.arc.network',
    'https://testnet.arcscan.app/'  // Adicionado o explorador oficial
  ],
  // ENDEREÇO OFICIAL DO CONTRATO USDC NA ARC TESTNET - FORNECIDO PELO USUÁRIO
  usdcContractAddress: '0x3600000000000000000000000000000000000000',
  // Outros contratos importantes (a serem adicionados quando disponíveis)
  contracts: {
    swapRouter: null, // A ser implantado
    bridge: null      // A ser implantado
  }
};

module.exports = { ARC_TESTNET_CONFIG };