import { JsonRpcProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';

// eth_blockNumber, eth_getBlockByNumber
const testEthBlockNumber = async (provider: JsonRpcProvider) => {
  // get the latest block number
  const latestBlockNumber = await provider.getBlockNumber();
  console.log('Latest block number:', latestBlockNumber);

  // get the latest block info
  const latestBlock = await provider.getBlock(latestBlockNumber);
  console.log('Latest block info:', latestBlock);
  console.log('');
};

// eth_chainId
const testEthChainId = async (provider: JsonRpcProvider) => {
  const chainId = await provider.getNetwork();
  console.log(`Chain ID: ${chainId.chainId}`);
  console.log(`Chain Name: ${chainId.name}`);
  console.log('');
};

// eth_estimateGas
const testEthEstimateGas = async (provider: JsonRpcProvider) => {
  // Define the transaction parameters
  const transaction = {
    from: '0x1234567890123456789012345678901234567890',
    to: '0x1234567890123456789012345678901234567890',
    data: '0x', // No additional data
  };

  // Estimate the gas required for the transaction
  const gasEstimate = await provider.estimateGas(transaction);
  console.log(`Estimated gas: ${gasEstimate.toString()}`);
  console.log('');
};

// eth_gasPrice
const testEthGasPrice = async (provider: JsonRpcProvider) => {
  const gasPrice = await provider.getGasPrice();
  console.log(`Gas price: ${gasPrice.toString()}`);
  console.log('');
};

const main = async (rpcUrl: string) => {
  // create an ethers.js provider that is connected to the local Ethereum RPC endpoint
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  await testEthBlockNumber(provider);
  await testEthChainId(provider);
  await testEthGasPrice(provider);
  await testEthEstimateGas(provider);
};

const rpcUrl = process.argv[2];

if (!rpcUrl) {
  console.error('Please provide an Ethereum RPC endpoint URL as an argument.');
  process.exit(1);
}

main(rpcUrl)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });