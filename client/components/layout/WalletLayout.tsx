import '@rainbow-me/rainbowkit/styles.css'
import {chains, config} from "../../utils/wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {WagmiConfig} from "wagmi";
import * as React from "react";
import {PropsWithChildren} from "react";
import {Navbar} from "./NavBar";
import {customRainbowTheme} from "../../utils/rainbow-theme";

export default function WalletLayout({children}: PropsWithChildren<{}>) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} modalSize="compact" theme={customRainbowTheme}>
        <div
          className="flex flex-col h-screen text-neutral-300">
          <Navbar/>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>

      </RainbowKitProvider>
    </WagmiConfig>
  )
}
