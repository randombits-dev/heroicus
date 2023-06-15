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
  1: ['us-east-1', 'US East'],
  2: ['us-east-2', 'US Central'],
  3: ['us-west-1', 'US South West'],
  4: ['us-west-2', 'US North West'],
  5: ['eu-central-1', 'Europe'],
  6: ['ap-northeast-2', 'Asia']
};
