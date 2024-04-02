import { ethers } from 'ethers';

async function main(rpcUrl: string) {
  // create an ethers.js provider that is connected to the local Ethereum RPC endpoint
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  // Define the transaction parameters
  const transaction = {
    // from: '0x1234567890123456789012345678901234567890',
    to: '0x1234567890123456789012345678901234567890',
    data: '0x', // No additional data
  };

  // Estimate the gas required for the transaction
  const gasEstimate = await provider.estimateGas(transaction);
  console.log(`Estimated gas: ${gasEstimate.toString()}`);
}

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