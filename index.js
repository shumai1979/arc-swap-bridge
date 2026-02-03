// ARC Network Swap & Bridge - Main Entry Point

const { ARCSwapContract, ARCBridgeContract } = require('./contracts/arc-contracts');

class ArcNetworkApp {
  constructor(walletAddress) {
    this.walletAddress = walletAddress;
    this.swap = new ARCSwapContract(walletAddress);
    this.bridge = new ARCBridgeContract(walletAddress);
  }

  async initialize() {
    console.log('Initializing ARC Network Swap & Bridge application...');
    console.log('Wallet:', this.walletAddress);
    
    // Simular conexão à rede ARC
    await this.connectToArcNetwork();
    console.log('Connected to ARC Network');
  }

  async connectToArcNetwork() {
    // Simular conexão
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
      
      // Demonstração rápida
      console.log('\n--- Demonstração ---');
      console.log('Taxa USDC->ARC:', app.getSwapRate('USDC', 'ARC'));
      console.log('Redes suportadas para bridge:', app.getSupportedNetworks());
    })
    .catch(console.error);
}