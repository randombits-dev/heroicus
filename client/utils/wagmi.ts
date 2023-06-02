import {getDefaultWallets} from '@rainbow-me/rainbowkit';
import {configureChains, createConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {hardhat} from '@wagmi/chains';

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
