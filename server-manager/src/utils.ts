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

export const REGIONS: { [key: number]: [string, string] } = {
  1: ['us-east-2', 'US East'],
  2: ['us-west-2', 'US West'],
  3: ['eu-central-1', 'Europe'],
  4: ['ap-northeast-2', 'Asia']
};
