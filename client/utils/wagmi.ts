import {getDefaultWallets} from '@rainbow-me/rainbowkit';
import {configureChains, createConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {CURRENT_CHAIN} from './network';

const {chains, publicClient, webSocketPublicClient} = configureChains(
  [CURRENT_CHAIN],
  [
    publicProvider(),
  ],
);

const {connectors} = getDefaultWallets({
  appName: 'Heroicus',
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
