export const hardhat = {
  id: 31337,
  name: 'Hardhat',
  network: 'hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://host.docker.internal:8545']
    },
    public: {
      http: ['http://host.docker.internal:8545']
    }
  }
};
