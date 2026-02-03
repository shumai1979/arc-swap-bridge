// ARC Network Swap & Bridge - Main Entry Point

const { ARCSwapContract, ARCBridgeContract, ARC_TESTNET_CONFIG } = require('./contracts/arc-contracts');

class ArcNetworkApp {
  constructor(walletAddress) {
    this.walletAddress = walletAddress;
    this.swap = new ARCSwapContract(walletAddress);
    this.bridge = new ARCBridgeContract(walletAddress);
    
    // Informações da rede
    this.networkInfo = {
      name: ARC_TESTNET_CONFIG.name,
      chainId: ARC_TESTNET_CONFIG.chainId,
      nativeGasToken: ARC_TESTNET_CONFIG.nativeCurrency.symbol,
      rpcUrls: ARC_TESTNET_CONFIG.rpcUrls
    };
  }

  async initialize() {
    console.log('Initializing ARC Network Swap & Bridge application...');
    console.log('Network:', this.networkInfo.name);
    console.log('Chain ID:', this.networkInfo.chainId);
    console.log('Native Gas Token:', this.networkInfo.nativeGasToken);
    console.log('Wallet:', this.walletAddress);
    
    // Conectar à rede ARC
    await this.connectToArcNetwork();
    console.log('Connected to ARC Network');
  }

  async connectToArcNetwork() {
    // Simular conexão à rede ARC
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Método para realizar swap
  async performSwap(fromToken, toToken, amount) {
    return await this.swap.swapTokens(fromToken, toToken, amount);
  }

  // Método para realizar bridge
  async performBridge(token, amount, destinationNetwork) {
    return await this.bridge.bridgeTokens(token, amount, destinationNetwork);
  }

  // Obter taxas de câmbio
  getSwapRate(fromToken, toToken) {
    return this.swap.getExchangeRate(fromToken, toToken);
  }

  // Obter redes suportadas
  getSupportedNetworks() {
    return this.bridge.getSupportedNetworks();
  }

  // Obter informações da rede
  getNetworkInfo() {
    return this.networkInfo;
  }
}

// Exportar a classe principal
module.exports = ArcNetworkApp;

// Se executado diretamente, inicializar a app
if (require.main === module) {
  const walletAddress = '0x51D182a04a9F22FDf424Dc854cc6c7bE70259024'; // Carteira Rabby
  
  const app = new ArcNetworkApp(walletAddress);
  app.initialize()
    .then(() => {
      console.log('ARC Network App initialized successfully');
      console.log('Network Info:', app.getNetworkInfo());
      
      // Demonstração rápida
      console.log('\n--- Demonstração ---');
      console.log('Taxa USDC->ETH:', app.getSwapRate('USDC', 'ETH'));
      console.log('Redes suportadas para bridge:', app.getSupportedNetworks());
    })
    .catch(console.error);
}