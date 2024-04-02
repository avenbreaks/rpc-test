import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    l1: {
      url: process.env.L1_RPC,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
    l2: {
      url: process.env.L2_RPC,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
  },
};

export default config;