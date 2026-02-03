const express = require('express');
const path = require('path');
const { ARCSwapContract, ARCBridgeContract } = require('./contracts/arc-contracts');
const { ARC_TESTNET_CONFIG } = require('./NETWORK_CONFIG');

const app = express();
const PORT = 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Instanciar os contratos
const walletAddress = '0x51D182a04a9F22FDf424Dc854cc6c7bE70259024';
const swapContract = new ARCSwapContract(walletAddress);
const bridgeContract = new ARCBridgeContract(walletAddress);

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para obter informações da rede
app.get('/api/network', (req, res) => {
  res.json({
    network: ARC_TESTNET_CONFIG.name,
    chainId: ARC_TESTNET_CONFIG.chainId,
    nativeCurrency: ARC_TESTNET_CONFIG.nativeCurrency,
    rpcUrls: ARC_TESTNET_CONFIG.rpcUrls
  });
});

// Endpoint para realizar swap
app.post('/api/swap', async (req, res) => {
  try {
    const { fromToken, toToken, amount } = req.body;
    
    if (!fromToken || !toToken || !amount) {
      return res.status(400).json({ error: 'Parâmetros inválidos: fromToken, toToken e amount são obrigatórios' });
    }
    
    const result = await swapContract.swapTokens(fromToken, toToken, parseFloat(amount));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para realizar bridge
app.post('/api/bridge', async (req, res) => {
  try {
    const { token, amount, destinationNetwork } = req.body;
    
    if (!token || !amount || !destinationNetwork) {
      return res.status(400).json({ error: 'Parâmetros inválidos: token, amount e destinationNetwork são obrigatórios' });
    }
    
    const result = await bridgeContract.bridgeTokens(token, parseFloat(amount), destinationNetwork);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obter taxas de câmbio
app.get('/api/rate/:from/:to', (req, res) => {
  const { from, to } = req.params;
  const rate = swapContract.getExchangeRate(from, to);
  
  if (rate === null) {
    return res.status(404).json({ error: 'Taxa de câmbio não encontrada' });
  }
  
  res.json({ from, to, rate });
});

// Endpoint para obter redes suportadas
app.get('/api/networks', (req, res) => {
  const networks = bridgeContract.getSupportedNetworks();
  res.json({ networks });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor ARC Network rodando na porta ${PORT}`);
  console.log(`Acesse http://localhost:${PORT} para usar a aplicação`);
  console.log(`Rede configurada: ${ARC_TESTNET_CONFIG.name} (Chain ID: ${ARC_TESTNET_CONFIG.chainId})`);
});

module.exports = app;