import '@rainbow-me/rainbowkit/styles.css'
import type {AppProps} from "next/app";
import {chains, config} from "../utils/wagmi";
import {darkTheme, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {WagmiConfig} from "wagmi";
import * as React from "react";
import {Navbar} from "../components/layout/NavBar";
import '../styles/index.css';
import '../styles/globals.css';
import {setup} from "goober";

setup(React.createElement);


export const metadata = {
  title: 'wagmi',
}

export default function RootLayout({Component, pageProps}: AppProps) {
  return (
    <div className="bg-neutral-900 text-neutral-300 h-screen">
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} modalSize="compact" theme={darkTheme()}>
          <Navbar/>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  )
}
