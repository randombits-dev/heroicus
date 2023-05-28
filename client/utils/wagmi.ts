import {getDefaultWallets} from '@rainbow-me/rainbowkit';
import {configureChains, createConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {hardhat} from '@wagmi/chains';

// const ganache = {
//   id: 1337,
//   name: 'Ganache',
//   network: 'Ganache',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Ether',
//     symbol: 'ETH'
//   },
//   rpcUrls: {
//     default: {
//       http: ['http://127.0.0.1:7545']
//     },
//     public: {
//       http: ['http://127.0.0.1:7545']
//     }
//   }
// };
const {chains, publicClient, webSocketPublicClient} = configureChains(
  [hardhat],
  [
    publicProvider(),
  ],
);

const {connectors} = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: '',
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export {chains};
