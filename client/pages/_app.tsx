import '@rainbow-me/rainbowkit/styles.css'
import type {AppProps} from "next/app";
import {chains, config} from "../utils/wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {WagmiConfig} from "wagmi";
import * as React from "react";
import {Navbar} from "../components/NavBar/NavBar";
import '../styles/index.css';
import {setup} from "goober";

setup(React.createElement);


export const metadata = {
  title: 'wagmi',
}

export default function RootLayout({Component, pageProps}: AppProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <Navbar/>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
